import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';
import { Resource } from './entities/resource.entity';
import { CategoryType } from './enums/category-type.enum';


describe('ResourcesController', () => {
  let controller: ResourcesController;
  let service: ResourcesService;

  const mockResourcesService = {
    getAllResources: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockResource: Resource = {
    id: 1,
    name: 'Sample Resource',
    description: 'A sample resource description',
    link: 'https://example.com',
    category: CategoryType.JOB,
    fromdate: new Date('2023-01-01'),
    todate: new Date('2023-12-31'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [
        {
          provide: ResourcesService,
          useValue: mockResourcesService,
        },
      ],
    }).compile();

    controller = module.get<ResourcesController>(ResourcesController);
    service = module.get<ResourcesService>(ResourcesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllResources', () => {
    it('should return an array of resources', async () => {
      mockResourcesService.getAllResources.mockResolvedValue([mockResource]);
      const result = await controller.getAllResources();
      expect(result).toEqual([mockResource]);
      expect(mockResourcesService.getAllResources).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching resources fails', async () => {
      mockResourcesService.getAllResources.mockRejectedValue(new Error('Database error'));
      await expect(controller.getAllResources()).rejects.toThrow('Database error');
      expect(mockResourcesService.getAllResources).toHaveBeenCalledTimes(1);
    });
  });
});
