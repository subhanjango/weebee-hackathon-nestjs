import { Module } from '@nestjs/common';
import { ProviderServicesService } from './provider-services.service';
import { ProviderServicesController } from './provider-services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderServices } from './entities/provider-services.entity';
import { ProviderServicesBreak } from './entities/provider-services-breaks.entity';
import { ProviderServicesSchedule } from './entities/provider-services-schedules.entity';
import { ProviderServicesPlannedOffSchedule } from './entities/provider-services-planned-off-schedules.entity';

@Module({
  controllers: [ProviderServicesController],
  providers: [ProviderServicesService],
  exports : [ProviderServicesService],
  imports : [TypeOrmModule.forFeature([ProviderServices,ProviderServicesBreak,ProviderServicesSchedule,ProviderServicesPlannedOffSchedule])]
})
export class ProviderServicesModule {}
