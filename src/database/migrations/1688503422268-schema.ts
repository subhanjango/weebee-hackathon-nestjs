import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Schema1688503422268 implements MigrationInterface {

    private tableName = 'provider_services_planned_off_schedules';

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
                    name : 'date',
                    type : 'varchar'
                },
                {
                    name : 'reason',
                    type : 'varchar',
                    length : '255'
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
                    name : 'fullDayOff',
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
