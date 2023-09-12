import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Client } from './clients.entity'
import { ClientRequest } from './clients.dto'
import { User, UserType } from '../user/users.entity'
import { Location } from '../locations/locations.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private clientsRepository: Repository<Client>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Location)
        private locationsRepository: Repository<Location>
    ) {}

    async findAll(): Promise<Client[]> {
        return await this.clientsRepository.find()
    }

    async findOne(id: number): Promise<Client> {
        const client = await this.clientsRepository.findOne({
            where: { id },
            relations: {
                locations: true,
                users: {
                    locations: true
                }
            }
        })
        if (!client) {
            throw new NotFoundException('Client not found')
        }
        return client
    }

    async create(clientRequest: ClientRequest): Promise<Client> {
        const client = this.clientsRepository.create(clientRequest)
        return this.clientsRepository.save(client)
    }

    async update(id: string, clientRequest: ClientRequest): Promise<void> {
        await this.clientsRepository.update(id, clientRequest)
    }

    async delete(id: string): Promise<void> {
        await this.clientsRepository.delete(id)
    }

    async createLocation(id: number, locationRequest: Pick<Location, 'abbr' | 'address'>): Promise<Client> {
        const client = await this.findOne(id)

        client.locations.push(this.locationsRepository.create(locationRequest))

        return this.clientsRepository.save(client)
    }

    async createUser(id: number, userRequest: Pick<User, 'email' | 'password'>): Promise<Client> {
        const client = await this.findOne(id)

        client.users.push(
            this.usersRepository.create({
                ...userRequest,
                password: await bcrypt.hash(userRequest.email, 10),
                type: UserType.CLIENT
            })
        )

        return this.clientsRepository.save(client)
    }
}
