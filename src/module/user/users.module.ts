import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Location } from '../locations/locations.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, Location])],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersService]
})
export class UsersModule {}
