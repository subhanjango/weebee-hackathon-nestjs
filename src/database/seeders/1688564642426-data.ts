import { ProviderServices } from "../../provider-services/entities/provider-services.entity"
import { MigrationInterface, QueryRunner } from "typeorm"

export class Data1688564642426 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.manager.save(
            queryRunner.manager.create<ProviderServices>(ProviderServices, {
                title : 'Men Haircut',
                maxBookingFutureDaysLimit : 7,
                maxClientPerBooking : 3,
                minuteDurationPerBooking : 10,
                prepBreakInMinute : 5
        }));

        await queryRunner.manager.save(
            queryRunner.manager.create<ProviderServices>(ProviderServices, {
                title : 'Women Haircut',
                maxBookingFutureDaysLimit : 7,
                maxClientPerBooking : 3,
                minuteDurationPerBooking : 60,
                prepBreakInMinute : 60
        }));


    }
        
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE from provider_services;`);
    }
    
}
    