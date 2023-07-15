import { Test, TestingModule } from "@nestjs/testing";
import { BookingsService } from "./bookings.service";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { Booking } from "./entities/bookings.entity";
import { Repository } from "typeorm";
import { ProviderServicesModule } from "../provider-services/provider-services.module";
import { UsersModule } from "../users/users.module";
import { testingdatabaseModuleOptions } from "../database/testing-database.provider";
import { ProviderServicesService } from "../provider-services/provider-services.service";

describe('BookingsService' , () => {
    
    const bookingMockData = new Booking(); 
    bookingMockData.providerServiceId = 1;
    bookingMockData.date = '2023-06-08';
    bookingMockData.userId = 1;
    bookingMockData.id = 1;
    bookingMockData.startTime = '12:00';
    bookingMockData.endTime = '12:10';

    const bookingResult = [
        {
            "id": 1,
            "providerServiceId": 1,
            "date": "2023-10-18",
            "startTime": "09:00",
            "endTime": "09:10",
            "userId": 1,
            "createdAt": "2023-07-15T12:20:13.000Z",
            "user": {
                "id": 1,
                "email": "subhannizarcha@gmail.com",
                "firstName": "Subhan",
                "lastName": "Nizar",
                "createdAt": "2023-07-06T18:00:01.000Z"
            },
            "providerService": {
                "id": 1,
                "title": "Men Haircut",
                "maxBookingFutureDaysLimit": 7,
                "maxClientPerBooking": 3,
                "minuteDurationPerBooking": 10,
                "prepBreakInMinute": 5,
                "createdAt": "2023-07-05T16:35:23.000Z"
            }
        }
    ];
    
    let service : BookingsService;
    let repository : Repository<Booking>;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookingsService,
                {
                    provide : getRepositoryToken(Booking),
                    useValue : {
                        create : jest.fn().mockReturnValue(bookingMockData),
                        save : jest.fn().mockReturnValue([bookingMockData]),
                        find : jest.fn().mockReturnValue(bookingResult)
                    }
                },
                {
                    provide : ProviderServicesService,
                    useValue : {
                        isSlotAvailable : jest.fn().mockImplementation((providerServiceId : number , date : string , startTime : string , endTime : string, usersLength : number) => {
                            return {
                                startTime,
                                endTime
                            }
                        })
                    }
                }
            ],
            imports: [
                TypeOrmModule.forRoot(testingdatabaseModuleOptions()),
                TypeOrmModule.forFeature([Booking]) , ProviderServicesModule , UsersModule,
            ],
        }).compile();
        
        service = module.get<BookingsService>(BookingsService);
        repository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    });
    
    it('should be defined' , () => {
        expect(service).toBeDefined();
    });
    
    it('should insert one booking' , async () => {

        jest.spyOn(service, 'createBooking');
        const repoSpy = jest.spyOn(repository , 'find');

        expect(await service.createBooking({
            providerServiceId : 1,
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
        })).toEqual(bookingResult);

        expect(repoSpy).toBeCalledTimes(0);
    });
    
});