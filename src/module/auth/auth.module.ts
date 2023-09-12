import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../user/users.module'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { config } from 'dotenv'

config()

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '7200s'
            }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
