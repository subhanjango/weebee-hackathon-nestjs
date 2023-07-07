import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProviderServices } from "./provider-services.entity";

@Entity({name : 'provider_services_planned_off_schedules'})
export class ProviderServicesPlannedOffSchedule {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column()
    reason: string;
    
    @Column()
    providerServiceId: number;

    @Column()
    date : string

    @Column()
    startTime? : string

    @Column()
    endTime? : string

    @Column()
    fullDayOff : boolean
    
    @Column({ type: 'timestamp' })
    createdAt?: string;

    @ManyToOne(() => ProviderServices , (providerService) => providerService.providerServicesBreak)
    providerService? : ProviderServices
}