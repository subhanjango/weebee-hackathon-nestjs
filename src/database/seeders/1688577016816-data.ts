import { MigrationInterface, QueryRunner } from "typeorm"
import { ProviderServices } from "../../provider-services/entities/provider-services.entity";
import { ProviderServicesBreak } from "../../provider-services/entities/provider-services-breaks.entity";
import { DAYS } from "../../constants";

export class Data1688577016816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.seedBreakByServiceTitle('Men Haircut' , queryRunner);
        this.seedBreakByServiceTitle('Women Haircut' , queryRunner);
    }

    private async seedBreakByServiceTitle(title : string , queryRunner : QueryRunner) : Promise<void> {
        let providerService : ProviderServices = await queryRunner.manager.findOneBy<ProviderServices>(ProviderServices , {title})
        
        let data : ProviderServicesBreak[] = [
            {
                dayNumber : DAYS.MONDAY,
                startTime : '12:00',
                endTime : '12:00',
                reason : 'Lunch Time',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.TUESDAY,
                startTime : '12:00',
                endTime : '12:00',
                reason : 'Lunch Time',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.WEDNESDAY,
                startTime : '12:00',
                endTime : '12:00',
                reason : 'Lunch Time',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.THURSDAY,
                startTime : '12:00',
                endTime : '12:00',
                reason : 'Lunch Time',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.FRIDAY,
                startTime : '12:00',
                endTime : '12:00',
                reason : 'Lunch Time',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.SATURDAY,
                startTime : '12:00',
                endTime : '12:00',
                reason : 'Lunch Time',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.MONDAY,
                startTime : '15:00',
                endTime : '16:00',
                reason : 'Cleaning Break',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.TUESDAY,
                startTime : '15:00',
                endTime : '16:00',
                reason : 'Cleaning Break',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.WEDNESDAY,
                startTime : '15:00',
                endTime : '16:00',
                reason : 'Cleaning Break',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.THURSDAY,
                startTime : '15:00',
                endTime : '16:00',
                reason : 'Cleaning Break',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.FRIDAY,
                startTime : '15:00',
                endTime : '16:00',
                reason : 'Cleaning Break',
                providerServiceId : providerService.id!
            },
            {
                dayNumber : DAYS.SATURDAY,
                startTime : '15:00',
                endTime : '16:00',
                reason : 'Cleaning Break',
                providerServiceId : providerService.id!
            },
        ];

        await Promise.all(data.map( async (value) => {
            return await queryRunner.manager.save(
                queryRunner.manager.create<ProviderServicesBreak>(ProviderServicesBreak,value));
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE from provider_services_breaks;`);
    }

}
