import { DAYS } from "../../constants";
import { ProviderServicesSchedule } from "../../provider-services/entities/provider-services-schedules.entity";
import { MigrationInterface, QueryRunner } from "typeorm"
import { ProviderServices } from "../../provider-services/entities/provider-services.entity";

export class Data1688569565626 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.seedScheduleByServiceTitle('Men Haircut' , queryRunner);
        this.seedScheduleByServiceTitle('Women Haircut' , queryRunner);
    }

    private async seedScheduleByServiceTitle(title : string , queryRunner : QueryRunner) : Promise<void> {
        let providerService : ProviderServices = await queryRunner.manager.findOneBy<ProviderServices>(ProviderServices , {title})
        
        let data : ProviderServicesSchedule[] = [
            {   
                dayNumber : DAYS.MONDAY,
                startTime : '08:00',
                endTime : '22:00',
                providerServiceId : providerService.id!,
                dayOff : false
            },
            {   
                dayNumber : DAYS.TUESDAY,
                startTime : '08:00',
                endTime : '22:00',
                providerServiceId : providerService.id!,
                dayOff : false
            },
            {   
                dayNumber : DAYS.WEDNESDAY,
                startTime : '08:00',
                endTime : '22:00',
                providerServiceId : providerService.id!,
                dayOff : false
            },
            {   
                dayNumber : DAYS.THURSDAY,
                startTime : '08:00',
                endTime : '22:00',
                providerServiceId : providerService.id!,
                dayOff : false
            },
            {   
                dayNumber : DAYS.FRIDAY,
                startTime : '08:00',
                endTime : '22:00',
                providerServiceId : providerService.id!,
                dayOff : false
            },
            {   
                dayNumber : DAYS.SATURDAY,
                startTime : '10:00',
                endTime : '22:00',
                providerServiceId : providerService.id!,
                dayOff : false
            },
            {   
                dayNumber : DAYS.SUNDAY,
                startTime : null,
                endTime : null,
                providerServiceId : providerService.id!,
                dayOff : true
            },
        ];

        await Promise.all(data.map( async (value) => {
            return await queryRunner.manager.save(
                queryRunner.manager.create<ProviderServicesSchedule>(ProviderServicesSchedule,value));
        }));
    } 

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE from provider_services_schedules;`);
    }

}
