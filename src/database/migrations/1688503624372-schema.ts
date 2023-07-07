import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Schema1688503624372 implements MigrationInterface {

    private tableName = 'bookings';

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
                    name : 'startTime',
                    type : 'varchar',
                },
                {
                    name : 'endTime',
                    type : 'varchar',
                },
                {
                    name : 'userId',
                    type : 'integer',
                    unsigned : true
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

        await queryRunner.createForeignKey(this.tableName , new TableForeignKey({
            columnNames : ['userId'],
            referencedColumnNames : ['id'],
            referencedTableName : 'users',
            onDelete : 'CASCADE'
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(new Table({
            name : this.tableName
        }));
    }

}
