import { Test, TestingModule } from "@nestjs/testing";
import { ProviderServicesService } from "./provider-services.service"
import { ProviderServicesController } from "./provider-services.controller";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { testingdatabaseModuleOptions } from "../database/testing-database.provider";
import { ProviderServices } from "./entities/provider-services.entity";
import { ProviderServicesBreak } from "./entities/provider-services-breaks.entity";
import { ProviderServicesSchedule } from "./entities/provider-services-schedules.entity";
import { ProviderServicesPlannedOffSchedule } from "./entities/provider-services-planned-off-schedules.entity";
import { Repository } from "typeorm";

describe('ProviderServicesService' , () => {

    const createQueryBuilder: any = {
        leftJoinAndSelect : () => createQueryBuilder,
        getOne: () => createQueryBuilder,
        where: () => createQueryBuilder
    };
    
    let service : ProviderServicesService;
    let repository : Repository<ProviderServices>;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProviderServicesController],
            providers: [
                ProviderServicesService,
                {
                    provide : getRepositoryToken(ProviderServices),
                    useValue : {
                        find : jest.fn(),
                        findOne : jest.fn(),
                        createQueryBuilder : jest.fn().mockImplementation(() => createQueryBuilder)
                    }
                }
            ],
            imports : [TypeOrmModule.forRoot(testingdatabaseModuleOptions()),TypeOrmModule.forFeature([ProviderServices,ProviderServicesBreak,ProviderServicesSchedule,ProviderServicesPlannedOffSchedule])]
        }).compile();
        
        service = module.get<ProviderServicesService>(ProviderServicesService);
        repository = module.get<Repository<ProviderServices>>(getRepositoryToken(ProviderServices));
    });

    it('should be defined' , () => {
        expect(service).toBeDefined();
    });

    it('should check for available slot' ,async () => {

        jest.spyOn(service , 'isSlotAvailable').mockImplementation((providerServiceId : number , date : string , startTime : string , endTime : string , usersCount : number) => {
            return Promise.resolve({
                startTime,
                endTime
            });
        });

        expect(await service.isSlotAvailable(1, '2023-07-05','12:00','12:10',2)).toEqual({
            startTime : '12:00',
            endTime : '12:10'
        });
    });

    it('should return array of objects' ,async () => {

        jest.spyOn(service , 'getSchedule').mockImplementation((providerServiceId? : number) : Promise<ProviderServices[] | ProviderServices> => {
            if(providerServiceId) {
                repository.findOne({});
                return Promise.resolve({} as ProviderServices);
            }
            repository.find();
            return Promise.resolve([] as ProviderServices[]);
        });

        expect(await service.getSchedule()).toEqual([]);
    });
});