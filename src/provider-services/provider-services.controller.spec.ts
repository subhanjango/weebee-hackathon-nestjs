import { Test, TestingModule } from '@nestjs/testing';
import { ProviderServicesController } from './provider-services.controller';
import { ProviderServicesService } from './provider-services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderServices } from './entities/provider-services.entity';
import { ProviderServicesBreak } from './entities/provider-services-breaks.entity';
import { ProviderServicesSchedule } from './entities/provider-services-schedules.entity';
import { ProviderServicesPlannedOffSchedule } from './entities/provider-services-planned-off-schedules.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database';
import appConfig from '../config/app';
import { testingdatabaseModuleOptions } from '../database/testing-database.provider';

describe('ProviderServicesController', () => {
  let controller: ProviderServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderServicesController],
      providers: [ProviderServicesService],
      imports : [ ConfigModule.forRoot({
        isGlobal: true,
        load : [databaseConfig , appConfig]
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: testingdatabaseModuleOptions
      }),
      TypeOrmModule.forFeature([ProviderServices,ProviderServicesBreak,ProviderServicesSchedule,ProviderServicesPlannedOffSchedule])]
    }).compile();

    controller = module.get<ProviderServicesController>(ProviderServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});
