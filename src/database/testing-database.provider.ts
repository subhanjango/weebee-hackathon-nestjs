import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Booking } from "../bookings/entities/bookings.entity";
import { ProviderServices } from "../provider-services/entities/provider-services.entity";
import { ProviderServicesBreak } from "../provider-services/entities/provider-services-breaks.entity";
import { ProviderServicesSchedule } from "../provider-services/entities/provider-services-schedules.entity";
import { ProviderServicesPlannedOffSchedule } from "../provider-services/entities/provider-services-planned-off-schedules.entity";
import { User } from "../users/entities/user.entity";

export const dataSourceOptions = () : TypeOrmModuleOptions => {
    return {
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest_app_test',
        entities: [Booking,ProviderServices,ProviderServicesBreak,ProviderServicesSchedule,ProviderServicesPlannedOffSchedule,User],
        synchronize: true,
        logging: false,
        retryAttempts: 5,
        retryDelay: 1000,
        autoLoadEntities : true,
        keepConnectionAlive: true,
    } as TypeOrmModuleOptions;
}

export const testingdatabaseModuleOptions = (): TypeOrmModuleOptions => {
    return dataSourceOptions();
}