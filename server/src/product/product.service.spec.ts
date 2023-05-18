/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let productService: ProductService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, PrismaService],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return an array of products', async () => {
      const result = [
        {
          id: 1,
          productName: 'Test Product',
          publisher: { publisherName: 'Test Publisher' },
          category: { categoryName: 'Test Category' },
          productStatus: { statusName: 'Test Status' },
        },
      ];

      jest
        .spyOn(prismaService.product, 'findMany')
        .mockImplementation(() => Promise.resolve(result));

      expect(await productService.getAllProducts()).toEqual(result);
    });
  });
});
