import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions, testingdatabaseModuleOptions } from '../database/testing-database.provider';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProviderServices } from './entities/provider-services.entity';
import { ProviderServicesBreak } from './entities/provider-services-breaks.entity';
import { ProviderServicesSchedule } from './entities/provider-services-schedules.entity';
import { ProviderServicesPlannedOffSchedule } from './entities/provider-services-planned-off-schedules.entity';
import { ProviderServicesController } from './provider-services.controller';
import { ProviderServicesService } from './provider-services.service';
describe('ProviderServices', () => {
    let module: TestingModule;
    let app: INestApplication;
    let dataSource : DataSource;
  
    beforeEach(async () => {
      module = await Test.createTestingModule({
        controllers: [ProviderServicesController],
        providers: [ProviderServicesService],
        imports : [TypeOrmModule.forRoot(testingdatabaseModuleOptions()),TypeOrmModule.forFeature([ProviderServices,ProviderServicesBreak,ProviderServicesSchedule,ProviderServicesPlannedOffSchedule])]  
      }).compile();
      
      app = module.createNestApplication();
      dataSource = new DataSource(dataSourceOptions() as DataSourceOptions) as DataSource;
      await dataSource.initialize();
      await app.init();
    });
  
    afterEach(async () => {
      await dataSource.destroy();
      await app.close();
    });
  
    it('should return 200', async () => {
        await request(app.getHttpServer()).get('/provider-services/schedule').expect(200);
    });
});
      