import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUserTable1693927247393 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: false
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['client', 'admin'],
                        isNullable: false
                    },
                    {
                        name: 'client_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                    }
                ],
                indices: [
                    {
                        columnNames: ['email'],
                        isUnique: true,
                        name: 'user_email_unique'
                    }
                ],
                engine: 'InnoDB'
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }
}
