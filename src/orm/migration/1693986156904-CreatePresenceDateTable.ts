import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePresenceDateTable1693986156904 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'presence_date',
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
                        name: 'interim_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: 'location_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: 'schedule_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: 'presence_date',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'am_start',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    },
                    {
                        name: 'am_end',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    },
                    {
                        name: 'pm_start',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    },
                    {
                        name: 'pm_end',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    },
                    {
                        name: 'am_status',
                        type: 'enum',
                        enum: ['', 'confirmed', 'late', 'absent'],
                        isNullable: false,
                        default: "''"
                    },
                    {
                        name: 'pm_status',
                        type: 'enum',
                        enum: ['', 'confirmed', 'late', 'absent'],
                        isNullable: false,
                        default: "''"
                    },
                    {
                        name: 'signature',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    }
                ],
                engine: 'InnoDB'
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('presence_date')
    }
}
