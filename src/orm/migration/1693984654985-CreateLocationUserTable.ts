import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLocationUserTable1693984654985 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'location_user',
                columns: [
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
                    }
                ],
                engine: 'InnoDB'
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location_user')
    }
}
