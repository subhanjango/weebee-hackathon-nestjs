import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/bookings.entity';
import { ProviderServicesModule } from '../provider-services/provider-services.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService],
  imports : [TypeOrmModule.forFeature([Booking]) , ProviderServicesModule , UsersModule]
})
export class BookingsModule {}
