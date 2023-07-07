import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Schema1688499088631 implements MigrationInterface {

    private tableName = 'users';

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
                    name : 'firstName',
                    type : 'varchar',
                    length : '255',
                },
                {
                    name : 'lastName',
                    type : 'varchar',
                    length : '255',
                },
                {
                    name : 'emailAddress',
                    type : 'varchar',
                    length : '255',
                    isUnique : true
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
