import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateInterimAvailPoolTable1693984469625 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'intm_avail_pool',
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
                        name: 'location_ids',
                        type: 'json',
                        isNullable: false
                    },
                    {
                        name: 'avail_date',
                        type: 'date',
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
        await queryRunner.dropTable('intm_avail_pool')
    }
}
