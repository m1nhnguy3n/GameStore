import { Test, TestingModule } from '@nestjs/testing';
import { StockStatusService } from './stock-status.service';

describe('ProductStatusService', () => {
  let service: StockStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockStatusService],
    }).compile();

    service = module.get<StockStatusService>(StockStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
