import { Test, TestingModule } from '@nestjs/testing';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { NotFoundException } from '@nestjs/common';
import { Skill } from './entities/skill.entity';
import { SkillType } from './enums/skill-type.enum';

describe('SkillsController', () => {
  let controller: SkillsController;
  let service: SkillsService;

  const mockSkillsService = {
    getAllSkills: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockSkill: Skill = {
    id: 1,
    name: 'JavaScript',
    type: SkillType.PROGRAMMING_LANGUAGES,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      providers: [
        {
          provide: SkillsService,
          useValue: mockSkillsService,
        },
      ],
    }).compile();

    controller = module.get<SkillsController>(SkillsController);
    service = module.get<SkillsService>(SkillsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSkills', () => {
    it('should return an array of skills', async () => {
      mockSkillsService.getAllSkills.mockResolvedValue([mockSkill]);
      const result = await controller.getAllSkills();
      expect(result).toEqual([mockSkill]);
      expect(mockSkillsService.getAllSkills).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching skills fails', async () => {
      mockSkillsService.getAllSkills.mockRejectedValue(new Error('Database error'));
      await expect(controller.getAllSkills()).rejects.toThrow('Database error');
      expect(mockSkillsService.getAllSkills).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a skill if found', async () => {
      mockSkillsService.findOne.mockResolvedValue(mockSkill);
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSkill);
      expect(mockSkillsService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillsService.findOne.mockRejectedValue(new NotFoundException('Skill not found'));
      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
      expect(mockSkillsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create and return a new skill', async () => {
      const newSkill = { name: 'TypeScript', type: SkillType.PROGRAMMING_LANGUAGES };
      mockSkillsService.create.mockResolvedValue({ id: 2, ...newSkill });

      const result = await controller.create(newSkill);
      expect(result).toEqual({ id: 2, ...newSkill });
      expect(mockSkillsService.create).toHaveBeenCalledWith(newSkill);
    });

    it('should throw an error if creating a skill fails', async () => {
      const newSkill = { name: 'TypeScript', type: SkillType.PROGRAMMING_LANGUAGES };
      mockSkillsService.create.mockRejectedValue(new Error('Database error'));

      await expect(controller.create(newSkill)).rejects.toThrow('Database error');
      expect(mockSkillsService.create).toHaveBeenCalledWith(newSkill);
    });
  });

  describe('update', () => {
    it('should update and return the updated skill', async () => {
      const updatedSkill = { name: 'Updated JavaScript' };
      mockSkillsService.update.mockResolvedValue({ ...mockSkill, ...updatedSkill });

      const result = await controller.update(1, updatedSkill);
      expect(result).toEqual({ ...mockSkill, ...updatedSkill });
      expect(mockSkillsService.update).toHaveBeenCalledWith(1, updatedSkill);
    });

    it('should throw NotFoundException if skill is not found', async () => {
      const updatedSkill = { name: 'Updated JavaScript' };
      mockSkillsService.update.mockRejectedValue(new NotFoundException('Skill not found'));

      await expect(controller.update(1, updatedSkill)).rejects.toThrow(NotFoundException);
      expect(mockSkillsService.update).toHaveBeenCalledWith(1, updatedSkill);
    });
  });

  describe('delete', () => {
    it('should delete the skill if found', async () => {
      mockSkillsService.delete.mockResolvedValue(undefined);
      const result = await controller.delete(1);
      expect(result).toBeUndefined();
      expect(mockSkillsService.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillsService.delete.mockRejectedValue(new NotFoundException('Skill not found'));
      await expect(controller.delete(1)).rejects.toThrow(NotFoundException);
      expect(mockSkillsService.delete).toHaveBeenCalledWith(1);
    });
  });
});
