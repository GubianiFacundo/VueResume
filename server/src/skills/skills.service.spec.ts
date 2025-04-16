import { Test, TestingModule } from '@nestjs/testing';
import { SkillsService } from './skills.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { SkillType } from './enums/skill-type.enum';

describe('SkillsService', () => {
  let service: SkillsService;
  let repository: Repository<Skill>;

  const mockSkillRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockSkill = { id: 1, name: 'JavaScript', type: SkillType.PROGRAMMING_LANGUAGES };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        {
          provide: getRepositoryToken(Skill),
          useValue: mockSkillRepository,
        },
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
    repository = module.get<Repository<Skill>>(getRepositoryToken(Skill));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSkills', () => {
    it('should return an array of skills', async () => {
      mockSkillRepository.find.mockResolvedValue([mockSkill]);
      const result = await service.getAllSkills();
      expect(result).toEqual([mockSkill]);
      expect(mockSkillRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching skills fails', async () => {
      mockSkillRepository.find.mockRejectedValue(new Error('Database error'));
      await expect(service.getAllSkills()).rejects.toThrow('Database error');
      expect(mockSkillRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a skill if found', async () => {
      mockSkillRepository.findOne.mockResolvedValue(mockSkill);
      const result = await service.findOne(1);
      expect(result).toEqual(mockSkill);
      expect(mockSkillRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new skill', async () => {
      const newSkill = { name: 'TypeScript', type: SkillType.PROGRAMMING_LANGUAGES };
      mockSkillRepository.create.mockReturnValue(newSkill);
      mockSkillRepository.save.mockResolvedValue({ id: 2, ...newSkill });

      const result = await service.create(newSkill);
      expect(result).toEqual({ id: 2, ...newSkill });
      expect(mockSkillRepository.create).toHaveBeenCalledWith(newSkill);
      expect(mockSkillRepository.save).toHaveBeenCalledWith(newSkill);
    });

    it('should throw an error if saving the skill fails', async () => {
      const newSkill = { name: 'TypeScript', type: SkillType.PROGRAMMING_LANGUAGES };
      mockSkillRepository.create.mockReturnValue(newSkill);
      mockSkillRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.create(newSkill)).rejects.toThrow('Database error');
      expect(mockSkillRepository.create).toHaveBeenCalledWith(newSkill);
      expect(mockSkillRepository.save).toHaveBeenCalledWith(newSkill);
    });
  });

  describe('update', () => {
    it('should update and return the updated skill', async () => {
      const updatedSkill = { name: 'Vue.js' };
      mockSkillRepository.findOne.mockResolvedValue(mockSkill);
      mockSkillRepository.save.mockResolvedValue({ ...mockSkill, ...updatedSkill });

      const result = await service.update(1, updatedSkill);
      expect(result).toEqual({ ...mockSkill, ...updatedSkill });
      expect(mockSkillRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockSkillRepository.save).toHaveBeenCalledWith({ ...mockSkill, ...updatedSkill });
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillRepository.findOne.mockResolvedValue(null);
      await expect(service.update(1, { name: 'C#' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the skill if found', async () => {
      mockSkillRepository.delete.mockResolvedValue({ affected: 1 });
      await service.delete(1);
      expect(mockSkillRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if skill is not found', async () => {
      mockSkillRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
