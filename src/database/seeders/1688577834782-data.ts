import { MigrationInterface, QueryRunner } from "typeorm"
import { ProviderServices } from "../../provider-services/entities/provider-services.entity";
import { ProviderServicesPlannedOffSchedule } from "../../provider-services/entities/provider-services-planned-off-schedules.entity";

export class Data1688577834782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        this.seedPlannedOffByServiceTitle('Men Haircut' , queryRunner);
        this.seedPlannedOffByServiceTitle('Women Haircut' , queryRunner);
    }

    private async seedPlannedOffByServiceTitle(title : string , queryRunner : QueryRunner) : Promise<void> {
        let providerService : ProviderServices = await queryRunner.manager.findOneBy<ProviderServices>(ProviderServices , {title})
        

        let data : ProviderServicesPlannedOffSchedule[] = [
            {
                date : new Date(new Date().setTime(new Date().getTime() +  (3 * 24 * 60 * 60 * 1000))).toISOString().split('T')[0],
                reason : 'Public Holiday',
                providerServiceId : providerService.id!,
                fullDayOff : true
            }
        ];

        await Promise.all(data.map( async (value) => {
            return await queryRunner.manager.save(
                queryRunner.manager.create<ProviderServicesPlannedOffSchedule>(ProviderServicesPlannedOffSchedule,value));
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
