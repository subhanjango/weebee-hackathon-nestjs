import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProviderServices } from "./provider-services.entity";

@Entity({ name : 'provider_services_breaks'})
export class ProviderServicesBreak {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    reason: string;
    
    @Column()
    providerServiceId: number;
    
    @Column()
    dayNumber: number;
    
    @Column()
    startTime: string;
    
    @Column()
    endTime: string;
    
    @Column({ type: 'timestamp' })
    createdAt?: string;

    @ManyToOne(() => ProviderServices , (providerService) => providerService.providerServicesBreak)
    providerService? : ProviderServices
}