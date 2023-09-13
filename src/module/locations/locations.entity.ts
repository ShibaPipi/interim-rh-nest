import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ManyToMany,
    JoinColumn,
    RelationId
} from 'typeorm'
import type { Client } from '../clients/clients.entity'
import type { User } from '../user/users.entity'

@Entity('location')
export class Location {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'bigint', unsigned: true })
    @RelationId((location: Location) => location.client)
    client_id: number

    @Column({ length: 255, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
    abbr: string

    @Column({ length: 255, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci' })
    address: string

    @CreateDateColumn({ nullable: true })
    created_at: Date

    @UpdateDateColumn({ nullable: true })
    updated_at: Date

    @ManyToOne('Client', (client: Client) => client.locations)
    @JoinColumn({ name: 'client_id' })
    client: Client

    @ManyToMany('User', (user: User) => user.locations)
    users: User[]
}
