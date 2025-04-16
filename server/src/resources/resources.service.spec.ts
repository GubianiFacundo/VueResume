import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesService } from './resources.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { NotFoundException } from '@nestjs/common';
import { CategoryType } from './enums/category-type.enum';

describe('ResourcesService', () => {
  let service: ResourcesService;
  let repository: Repository<Resource>;

  const mockResourceRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
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
      providers: [
        ResourcesService,
        {
          provide: getRepositoryToken(Resource),
          useValue: mockResourceRepository,
        },
      ],
    }).compile();

    service = module.get<ResourcesService>(ResourcesService);
    repository = module.get<Repository<Resource>>(getRepositoryToken(Resource));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllResources', () => {
    it('should return an array of resources', async () => {
      mockResourceRepository.find.mockResolvedValue([mockResource]);
      const result = await service.getAllResources();
      expect(result).toEqual([mockResource]);
      expect(mockResourceRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching resources fails', async () => {
      mockResourceRepository.find.mockRejectedValue(new Error('Database error'));
      await expect(service.getAllResources()).rejects.toThrow('Database error');
      expect(mockResourceRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
