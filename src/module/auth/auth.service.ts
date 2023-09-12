import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../user/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(email: string, pwd: string) {
        const user = await this.usersService.findOneByEmail(email)

        const isMatch = await bcrypt.compare(pwd, user.password)
        if (!isMatch) throw new UnauthorizedException()

        const payload = { sub: user.id, username: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload),
            type: user.type
        }
    }
}
