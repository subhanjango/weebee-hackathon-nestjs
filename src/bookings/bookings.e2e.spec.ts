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
import { ProviderServicesBreak } from '../provider-services/entities/provider-services-breaks.entity';
import { ProviderServicesPlannedOffSchedule } from '../provider-services/entities/provider-services-planned-off-schedules.entity';

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
    
    let providerService = await dataSource.manager.save(
      dataSource.manager.create<ProviderServices>(ProviderServices , {
        title : 'Men Haircut',
        maxBookingFutureDaysLimit : 7,
        maxClientPerBooking : 3,
        minuteDurationPerBooking : 10,
        prepBreakInMinute : 5,
        createdAt : new Date().toISOString()
      }));
      
      const response = await request(app.getHttpServer()).post('/bookings').send({
        providerServiceId : providerService.id,
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
      
      
      expect(response.body.message).toBe('Day Off');
      
    });
    
    it('should return 201 if booking validations are met and booking is created' ,async () => {
      
      let providerService = await dataSource.manager.save(
        dataSource.manager.create<ProviderServices>(ProviderServices , {
          title : 'Men Haircut',
          maxBookingFutureDaysLimit : 7,
          maxClientPerBooking : 3,
          minuteDurationPerBooking : 10,
          prepBreakInMinute : 5,
          createdAt : new Date().toISOString()
        }));
        
        
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
          return await dataSource.manager.save(
            dataSource.manager.create<ProviderServicesSchedule>(ProviderServicesSchedule,value));
        }));

        await request(app.getHttpServer()).post('/bookings').send({
          providerServiceId : providerService.id,
          date : "2023-08-15",
          startTime : "14:00",
          endTime : "14:20",
          users : [
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            }
          ]
        }).set('Content-Type', 'application/json').expect(201);
          
    });

    it('should return 400 if booking time is break time' ,async () => {
      
      let providerService = await dataSource.manager.save(
        dataSource.manager.create<ProviderServices>(ProviderServices , {
          title : 'Men Haircut',
          maxBookingFutureDaysLimit : 7,
          maxClientPerBooking : 3,
          minuteDurationPerBooking : 10,
          prepBreakInMinute : 5,
          createdAt : new Date().toISOString()
        }));
        
        
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
          return await dataSource.manager.save(
            dataSource.manager.create<ProviderServicesSchedule>(ProviderServicesSchedule,value));
        }));

        let breakTime = await dataSource.manager.save(
          dataSource.manager.create<ProviderServicesBreak>(ProviderServicesBreak , {
            dayNumber : DAYS.TUESDAY,
            startTime : '12:00',
            endTime : '12:00',
            reason : 'Lunch Time',
            providerServiceId : providerService.id!
        })
        )

        const response = await request(app.getHttpServer()).post('/bookings').send({
          providerServiceId : providerService.id,
          date : "2023-08-15",
          startTime : "12:00",
          endTime : "12:40",
          users : [
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            }
          ]
        }).set('Content-Type', 'application/json').expect(400);

        expect(response.body.message).toBe(breakTime.reason);
    });

    it('should return 400 if booking request is on public holiday' ,async () => {
      
      let providerService = await dataSource.manager.save(
        dataSource.manager.create<ProviderServices>(ProviderServices , {
          title : 'Men Haircut',
          maxBookingFutureDaysLimit : 7,
          maxClientPerBooking : 3,
          minuteDurationPerBooking : 10,
          prepBreakInMinute : 5,
          createdAt : new Date().toISOString()
        }));
        
        
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
          return await dataSource.manager.save(
            dataSource.manager.create<ProviderServicesSchedule>(ProviderServicesSchedule,value));
        }));

        let holiday = await dataSource.manager.save(
          dataSource.manager.create<ProviderServicesPlannedOffSchedule>(ProviderServicesPlannedOffSchedule , {
            date : '2023-10-09',
            reason : 'Public Holiday',
            providerServiceId : providerService.id!,
            fullDayOff : true
        }));

        const response = await request(app.getHttpServer()).post('/bookings').send({
          providerServiceId : providerService.id,
          date : "2023-10-09",
          startTime : "12:00",
          endTime : "12:40",
          users : [
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            }
          ]
        }).set('Content-Type', 'application/json').expect(400);

        expect(response.body.message).toBe(holiday.reason);
    });

    it('should return 400 if booking slot user limit is exceeded' ,async () => {
      
      let providerService = await dataSource.manager.save(
        dataSource.manager.create<ProviderServices>(ProviderServices , {
          title : 'Men Haircut',
          maxBookingFutureDaysLimit : 7,
          maxClientPerBooking : 3,
          minuteDurationPerBooking : 10,
          prepBreakInMinute : 5,
          createdAt : new Date().toISOString()
        }));
        
        
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
          return await dataSource.manager.save(
            dataSource.manager.create<ProviderServicesSchedule>(ProviderServicesSchedule,value));
        }));

        const response = await request(app.getHttpServer()).post('/bookings').send({
          providerServiceId : providerService.id,
          date : "2023-08-15",
          startTime : "14:00",
          endTime : "14:20",
          users : [
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            },
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            },
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            },
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            },
            {
              firstName : "Subhan",
              lastName : "Nizar",
              emailAddress : "subhannizarcha@gmail.com"
            }
          ]
        }).set('Content-Type', 'application/json').expect(400);


        expect(response.body.message).toBe('User limit exceeded');
          
    });
});
      