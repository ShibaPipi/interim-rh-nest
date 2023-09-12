import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { ROUTE_WITHOUT_TOKEN_KEY } from 'src/decorator/route-without-token.decorator'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const withoutAuth = this.reflector.getAllAndOverride<boolean>(ROUTE_WITHOUT_TOKEN_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (withoutAuth) return true

        const request = context.switchToHttp().getRequest()

        const token = this.extractTokenFromHeader(request)
        if (!token) throw new UnauthorizedException()

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET')
            })
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []

        return type.toLowerCase() === 'bearer' ? token : undefined
    }
}
