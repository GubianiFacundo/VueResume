import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProjectService', () => {
  let service: ProjectService;
  let repository: Repository<Project>;

  const mockProjectRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockProject: Project = {
    id: 1,
    name: 'Sample Project',
    description: {
      en: 'Sample project description in English',
      es: 'Descripción del proyecto de muestra en español',
    },
    data: {
      en: 'Sample project data in English',
      es: 'Datos del proyecto de muestra en español',
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProjects', () => {
    it('should return an array of projects', async () => {
      mockProjectRepository.find.mockResolvedValue([mockProject]);
      const result = await service.getAllProjects();
      expect(result).toEqual([mockProject]);
      expect(mockProjectRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching projects fails', async () => {
      mockProjectRepository.find.mockRejectedValue(new Error('Database error'));
      await expect(service.getAllProjects()).rejects.toThrow('Database error');
      expect(mockProjectRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
