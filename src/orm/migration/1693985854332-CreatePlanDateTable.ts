import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePlanDateTable1693985854332 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'plan_date',
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
                        name: 'plan_date',
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
                    }
                ],
                engine: 'InnoDB'
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('plan_date')
    }
}
