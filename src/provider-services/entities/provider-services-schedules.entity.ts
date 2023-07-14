import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProviderServices } from "./provider-services.entity";

@Entity({ name : 'provider_services_schedules'})
export class ProviderServicesSchedule {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    providerServiceId: number;
    
    @Column()
    dayNumber: number;
    
    @Column({ nullable : true })
    startTime?: string;

    @Column({ nullable : true })
    endTime?: string;
    
    @Column()
    dayOff: boolean;
    
    @Column({ type: 'datetime' , default : () => 'CURRENT_TIMESTAMP' })
    createdAt?: string;

    @ManyToOne(() => ProviderServices , (providerService) => providerService.providerServicesSchedule)
    providerService? : ProviderServices
}