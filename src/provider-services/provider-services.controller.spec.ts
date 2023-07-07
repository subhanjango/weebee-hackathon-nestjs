import { Test, TestingModule } from '@nestjs/testing';
import { ProviderServicesController } from './provider-services.controller';
import { ProviderServicesService } from './provider-services.service';

describe('ProviderServicesController', () => {
  let controller: ProviderServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderServicesController],
      providers: [ProviderServicesService],
    }).compile();

    controller = module.get<ProviderServicesController>(ProviderServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
