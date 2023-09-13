import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn
} from 'typeorm'
import { Client } from '../clients/clients.entity'
import type { Location } from '../locations/locations.entity'

export enum UserType {
    ADMIN = 'admin',
    CLIENT = 'client'
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'varchar', length: 255 })
    password: string

    @Column({ type: 'enum', enum: UserType, collation: 'utf8mb4_general_ci' })
    type: UserType

    @Column({ type: 'bigint', unsigned: true, nullable: true })
    @RelationId((user: User) => user.client)
    client_id: number | null

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at: Date | null

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    updated_at: Date | null

    @ManyToOne('Client', (client: Client) => client.users)
    @JoinColumn({ name: 'client_id' })
    client: Client

    @ManyToMany('Location', (location: Location) => location.users, { cascade: true })
    @JoinTable({
        name: 'location_user',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'location_id',
            referencedColumnName: 'id'
        }
    })
    locations: Location[]
}
