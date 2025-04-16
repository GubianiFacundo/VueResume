import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockProjectService = {
    getAllProjects: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
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
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockProjectService,
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllProjects', () => {
    it('should return an array of projects', async () => {
      mockProjectService.getAllProjects.mockResolvedValue([mockProject]);
      const result = await controller.getAllProjects();
      expect(result).toEqual([mockProject]);
      expect(mockProjectService.getAllProjects).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching projects fails', async () => {
      mockProjectService.getAllProjects.mockRejectedValue(new Error('Database error'));
      await expect(controller.getAllProjects()).rejects.toThrow('Database error');
      expect(mockProjectService.getAllProjects).toHaveBeenCalledTimes(1);
    });
  });
});
