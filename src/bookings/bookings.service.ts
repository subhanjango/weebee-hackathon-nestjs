import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/bookings.entity';
import { In, Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ProviderServicesService } from '../provider-services/provider-services.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BookingsService {
    constructor( @InjectRepository(Booking)
    private booking : Repository<Booking> , 
    private readonly providerServicesService : ProviderServicesService , 
    private readonly userService : UsersService){}

    async createBooking(data : CreateBookingDto) {
        try {

            data.date = this.revertDateToString(data.date , 'DATE');

            let slotAvailable = await this.providerServicesService.isSlotAvailable(data.providerServiceId , data.date , data.startTime, data.endTime, data.users.length);

            console.log('slotAvailable' , slotAvailable);

            let bookings = data.users.map(async (user) => {
                
                let bookingFor = await this.userService.createUser(user.emailAddress , user.firstName , user.lastName);
                
                let booking = await this.booking.save(this.booking.create({
                    providerServiceId : data.providerServiceId,
                    date : data.date,
                    startTime : slotAvailable.startTime,
                    endTime : slotAvailable.endTime,
                    userId : bookingFor.id
                }));

                return booking.id;

            });

            let bookingIds = await Promise.all(bookings);

            return await this.booking.find({
                relations : {
                    user : true,
                    providerService : true
                },
                where : {
                    id : In(bookingIds)
                }
            })

        }catch(e) {
            return {
                status : false,
                error : e
            }
        }
    }

    private revertDateToString(value , type : 'DATE' | 'TIME') : string {
        switch(type) {
            case 'DATE':
                value = value.toISOString().split('T')[0];
                break;

            case 'TIME':
                value = value.toISOString().split('T')[1].split(':')[0] + ':' + value.toISOString().split('T')[1].split(':')[1]
        }
        return value;
    }
}