import { Controller, Get } from '@nestjs/common';
import { ProviderServicesService } from './provider-services.service';

@Controller('provider-services')
export class ProviderServicesController {
  constructor(private readonly providerServicesService: ProviderServicesService) {}

  @Get('/schedule')
  async getSchedule() {
    return await this.providerServicesService.getSchedule();
  }
}
