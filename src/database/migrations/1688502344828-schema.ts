import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Schema1688502344828 implements MigrationInterface {

    private tableName = 'provider_services';

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
                    name : 'title',
                    type : 'varchar',
                    length : '255'
                },
                {
                    name : 'maxBookingFutureDaysLimit',
                    type : 'integer',
                },
                {
                    name : 'maxClientPerBooking',
                    type : 'integer',
                },
                {
                    name : 'minuteDurationPerBooking',
                    type : 'integer',
                },
                {
                    name : 'prepBreakInMinute',
                    type : 'integer',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ]
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(new Table({
            name : this.tableName
        }));
    }

}
