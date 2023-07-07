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
    
    @Column()
    startTime: string;

    @Column()
    endTime: string;
    
    @Column()
    dayOff: boolean;
    
    @Column({ type: 'timestamp' })
    createdAt?: string;

    @ManyToOne(() => ProviderServices , (providerService) => providerService.providerServicesSchedule)
    providerService? : ProviderServices
}