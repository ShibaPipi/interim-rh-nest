import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Location } from '../locations/locations.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Location)
        private locationsRepository: Repository<Location>
    ) {}

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id })

        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOneBy({ email })

        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id)
    }

    async storeLocations(id: number, locations: number[]): Promise<User> {
        const user = await this.findOne(id)
        const userLocations = await this.locationsRepository.findBy({ id: In(locations) })

        user.locations = userLocations
        return await this.usersRepository.save(user)
    }
}
