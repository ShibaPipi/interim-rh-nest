import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm'
import type { User } from '../user/users.entity'
import type { Location } from '../locations/locations.entity'

@Entity('client')
export class Client {
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'varchar', length: 255, nullable: true, comment: 'Enterprise Identification Number' })
    EIN: string | null

    @Column({ type: 'varchar', length: 255, nullable: true, comment: 'VAT Identification Number (VATIN)' })
    VATIN: string | null

    @Column({ type: 'date', nullable: true })
    join_date: Date | null

    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string | null

    @Column({ type: 'varchar', length: 255, nullable: true })
    phone: string | null

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact: string | null

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany('Location', (location: Location) => location.client, { cascade: true })
    @JoinColumn({ name: 'client_id' })
    locations: Location[]

    @OneToMany('User', (user: User) => user.client, { cascade: true })
    @JoinColumn({ name: 'client_id' })
    users: User[]
}
