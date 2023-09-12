import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ClientsService } from './clients.service'
import { Client } from './clients.entity'
import { User } from '../user/users.entity'
import { Location } from '../locations/locations.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Client, User, Location])],
    providers: [ClientsService],
    exports: [TypeOrmModule, ClientsService]
})
export class ClientsModule {}
