import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database';
import appConfig from './config/app';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseModuleOptions } from './database/database.providers';
import { UsersModule } from './users/users.module';
import { ProviderServicesModule } from './provider-services/provider-services.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load : [databaseConfig , appConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseModuleOptions
    }),
    UsersModule,
    ProviderServicesModule,
    BookingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
