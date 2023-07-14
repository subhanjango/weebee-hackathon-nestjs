import { ProviderServices } from "../../provider-services/entities/provider-services.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'bookings' })
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    providerServiceId: number;
    
    @Column()
    date: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @Column()
    userId: number;
    
    @Column({ type: 'datetime' , default : () => 'CURRENT_TIMESTAMP' })
    createdAt: string;

    @ManyToOne(() => ProviderServices , (providerService) => providerService.bookings)
    providerService : ProviderServices

    @ManyToOne(() => User , (user) => user.bookings)
    user : User
}