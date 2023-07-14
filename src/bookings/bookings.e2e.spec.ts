import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions, testingdatabaseModuleOptions } from '../database/testing-database.provider';
import { bookingsModule } from './bookings.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ProviderServices } from '../provider-services/entities/provider-services.entity';
import { Booking } from './entities/bookings.entity';
import { ProviderServicesModule } from '../provider-services/provider-services.module';
import { UsersModule } from '../users/users.module';
import { ProviderServicesSchedule } from '../provider-services/entities/provider-services-schedules.entity';
import { DAYS } from '../constants';

describe('Bookings', () => {
  let module: TestingModule;
  let app: INestApplication;
  let dataSource : DataSource;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      ...bookingsModule,
      imports: [
          TypeOrmModule.forRoot(testingdatabaseModuleOptions()),
          TypeOrmModule.forFeature([Booking]) , ProviderServicesModule , UsersModule,
      ],
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

  it('should return 400 if no post data is present', async () => {
    await request(app.getHttpServer()).post('/bookings').expect(400);
  });

  it('should return 400 if no schedule added yet' , async() => {

    await dataSource.manager.save(
        dataSource.manager.create<ProviderServices>(ProviderServices , {
            title : 'Men Haircut',
            maxBookingFutureDaysLimit : 7,
            maxClientPerBooking : 3,
            minuteDurationPerBooking : 10,
            prepBreakInMinute : 5,
            createdAt : new Date().toISOString()
        })
    );

    await request(app.getHttpServer()).post('/bookings').send({
        providerServiceId : 1,
        date : "2023-07-15",
        startTime : "14:00",
        endTime : "14:20",
        users : [
            {
                firstName : "Subhan",
                lastName : "Nizar",
                emailAddress : "subhannizarcha@gmail.com"
            }
        ]
    }).set('Content-Type', 'application/json').expect(400);
  })
});
