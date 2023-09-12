import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateScheduleTable1693986489674 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'schedules',
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
                        name: 'user_id',
                        type: 'bigint',
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: 'week',
                        type: 'tinyint',
                        isNullable: false
                    },
                    {
                        name: 'comment',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    },
                    {
                        name: 'comment_rate',
                        type: 'varchar',
                        length: '255',
                        charset: 'utf8mb4',
                        collation: 'utf8mb4_unicode_ci',
                        isNullable: true
                    },
                    {
                        name: 'comment_time',
                        type: 'timestamp',
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
                engine: 'InnoDB'
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('schedules')
    }
}
