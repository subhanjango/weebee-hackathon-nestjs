import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProviderServicesBreak } from "./provider-services-breaks.entity";
import { ProviderServicesPlannedOffSchedule } from "./provider-services-planned-off-schedules.entity";
import { ProviderServicesSchedule } from "./provider-services-schedules.entity";
import { Booking } from "../../bookings/entities/bookings.entity";

@Entity()
export class ProviderServices {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;
    
    @Column()
    maxBookingFutureDaysLimit: number;
    
    @Column()
    maxClientPerBooking: number;
    
    @Column()
    minuteDurationPerBooking: number;
    
    @Column()
    prepBreakInMinute: number;
    
    @Column({ type : 'datetime' , default : () => 'CURRENT_TIMESTAMP' })
    createdAt: string;

    @OneToMany(() => ProviderServicesBreak , (providerServicesBreak) => providerServicesBreak.providerService)
    providerServicesBreak : ProviderServicesBreak[]

    @OneToMany(() => ProviderServicesPlannedOffSchedule , (providerServicesPlannedOffSchedule) => providerServicesPlannedOffSchedule.providerService)
    providerServicesPlannedOffSchedule : ProviderServicesPlannedOffSchedule[]

    @OneToMany(() => ProviderServicesSchedule , (providerServicesSchedule) => providerServicesSchedule.providerService)
    providerServicesSchedule : ProviderServicesSchedule[]

    @OneToMany(() => Booking , (booking) => booking.providerService)
    bookings : Booking[]
}