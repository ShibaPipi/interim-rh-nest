import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../user/users.entity'
import { AuthGuard } from './auth.guard'
import { WithoutToken } from 'src/decorator/route-without-token.decorator'

@Controller('api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @WithoutToken()
    @Post('login')
    login(@Body() dto: Pick<User, 'email' | 'password'>) {
        return this.authService.login(dto.email, dto.password)
    }

    @UseGuards(AuthGuard)
    @Get('me')
    me(@Request() req: any) {
        return req.user
    }
}
