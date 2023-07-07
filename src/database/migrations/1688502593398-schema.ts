import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Schema1688502593398 implements MigrationInterface {

    private tableName = 'provider_services_breaks';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name : this.tableName,
            columns : [
                {
                    name : 'id',
                    type : 'integer',
                    isPrimary : true,
                    isGenerated : true,
                    generationStrategy : 'increment',
                    unsigned : true
                },
                {
                    name : 'reason',
                    type : 'varchar',
                    length : '255'
                },
                {
                    name : 'providerServiceId',
                    type : 'integer',
                    length : '11',
                    unsigned : true
                },
                {
                    name : 'dayNumber',
                    type : 'integer'
                },
                {
                    name : 'startTime',
                    type : 'varchar'
                },
                {
                    name : 'endTime',
                    type : 'varchar'
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ]
        }));

        await queryRunner.createForeignKey(this.tableName , new TableForeignKey({
            columnNames : ['providerServiceId'],
            referencedColumnNames : ['id'],
            referencedTableName : 'provider_services',
            onDelete : 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(new Table({
            name : this.tableName
        }));
    }

}
