import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './users.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })

        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email })

        if (!user) throw new NotFoundException('User not found')
        return user
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id)
    }
}
