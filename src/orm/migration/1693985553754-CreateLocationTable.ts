import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLocationTable1693985553754 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'location',
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
                        name: 'client_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: 'abbr',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: false
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: false
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
                engine: 'InnoDB'
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location')
    }
}
