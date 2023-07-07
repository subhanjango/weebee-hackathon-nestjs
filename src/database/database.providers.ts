import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseType } from "typeorm";

export const databaseModuleOptions = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
        type: configService.get<DatabaseType>('dbConnection'),
        host: configService.get<string>('dbHost'),
        port: configService.get<number>('dbPort'),
        username: configService.get<string>('dbUsername'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('dbDatabase'),
        synchronize: false,
        logging: false,
        retryAttempts: 5,
        retryDelay: 1000,
        autoLoadEntities : true,
        keepConnectionAlive: true,
    } as TypeOrmModuleOptions;
}