import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Schema1688503072805 implements MigrationInterface {

    private tableName = 'provider_services_schedules';

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
                    type : 'varchar',
                    isNullable : true
                },
                {
                    name : 'endTime',
                    type : 'varchar',
                    isNullable : true
                },
                {
                    name : 'dayOff',
                    type : 'boolean',
                    default : false
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
