import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProviderServices } from './entities/provider-services.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DAYS } from '../constants';
import { createSlots, dateDiffInDays } from '../helpers';

@Injectable()
export class ProviderServicesService {
    
    constructor( @InjectRepository(ProviderServices)
    private providerServicesRepository: Repository<ProviderServices>){}
    
    async isSlotAvailable(providerServiceId : number , date : string , startTime : string , endTime : string , usersCount : number) : Promise<{startTime : string , endTime : string}> {
        
        let daySelected = new Date(date).getDay() === 0 ? 7 : new Date(date).getDay();  

        let dayNumber = DAYS[Object.keys(DAYS).find((value) => parseInt(DAYS[value]) === daySelected)];
        
        let serviceSchedule = await this.getScheduleForSlots(providerServiceId , startTime , date , dayNumber);
        
        try {
            await this.checkForServiceLimits(serviceSchedule , date , usersCount);
            await this.scheduleCheck(serviceSchedule , usersCount, parseInt(dayNumber) , date ,startTime);
            let slots = createSlots(startTime , endTime , serviceSchedule.minuteDurationPerBooking , serviceSchedule.prepBreakInMinute);
            let availableSlot = slots.find((time) => time.startTime === startTime);
            if(!availableSlot) {
                throw 'Invalid Slot';
            }
            return availableSlot;
        } catch(e) {
            throw e;
        }   
    }
    
    async scheduleCheck(providerService : ProviderServices ,  usersCount : number , dayNumber : number , date : string , startTime : string) {
        let schedule = providerService.providerServicesSchedule.find((schedule)=>schedule.dayNumber === dayNumber);
        
        if(!schedule || schedule.dayOff){
            throw 'Day Off'
        }

        if(providerService.providerServicesPlannedOffSchedule.length) {
            throw providerService.providerServicesPlannedOffSchedule[0].reason;
        }

        if(providerService.providerServicesBreak.length) {
            throw providerService.providerServicesBreak[0].reason;
        }

        if(providerService.bookings.length) {
            let spaceLeft = providerService.maxClientPerBooking - providerService.bookings.length;
            if(spaceLeft < usersCount) {
                throw 'Slots are fully booked , available slot is for (' + spaceLeft + ') person(s)';
            }
        }
    }

    async getScheduleForSlots(providerServiceId : number , startTime : string , date : string , dayNumber : number) {
        return await this.providerServicesRepository.createQueryBuilder('providerService')
        .leftJoinAndSelect('providerService.providerServicesSchedule' , 'providerServicesSchedule' , 'providerServicesSchedule.dayNumber = :dayNumber' , { dayNumber} )
        .leftJoinAndSelect('providerService.providerServicesBreak' , 'providerServicesBreak' , 'providerServicesBreak.dayNumber = :dayNumber AND (providerServicesBreak.startTime <= :startTime AND providerServicesBreak.endTime >= :startTime)' , { dayNumber , startTime})
        .leftJoinAndSelect('providerService.providerServicesPlannedOffSchedule' , 'providerServicesPlannedOffSchedule' , 'providerServicesPlannedOffSchedule.date = :date AND ((providerServicesPlannedOffSchedule.startTime <= :startTime AND providerServicesPlannedOffSchedule.endTime >= :startTime) OR fullDayOff = 1)' , { date , startTime})
        .leftJoinAndSelect('providerService.bookings' , 'bookings' , 'bookings.date = :date AND (bookings.startTime <= :startTime AND bookings.endTime >= :startTime)' , {date , startTime})
        .where('providerService.id = :providerServiceId' , {providerServiceId})
        .getOne()
    }
    
    async checkForServiceLimits(providerService : ProviderServices , date : string , usersCount : number) {
        if(providerService.maxClientPerBooking < usersCount) {
            throw 'User limit exceeded';
        }
        
        if(providerService.maxBookingFutureDaysLimit < dateDiffInDays(new Date(date) , new Date())) {
            throw 'Booking for future can only be done under ' + providerService.maxBookingFutureDaysLimit + ' days';
        }
    }
    
    async getSchedule(providerServiceId? : number) : Promise<ProviderServices[] | ProviderServices> {  
        let query = {
            relations : {
                providerServicesBreak:true,
                providerServicesSchedule: true,
                providerServicesPlannedOffSchedule:true,
                bookings:true
            },
            order : {
                providerServicesBreak : {
                    dayNumber : 'ASC'
                },
                providerServicesSchedule : {
                    dayNumber : 'ASC'
                },
                providerServicesPlannedOffSchedule : {
                    date : 'ASC'
                },
                bookings : {
                    date : 'ASC'
                },
            }
        };
        
        if(providerServiceId) {
            query['where'] = {id : providerServiceId};
            return await this.providerServicesRepository.findOne(query as FindOneOptions<ProviderServices>);
        }
        return await this.providerServicesRepository.find(query as FindManyOptions<ProviderServices>) 
    }
    
}
