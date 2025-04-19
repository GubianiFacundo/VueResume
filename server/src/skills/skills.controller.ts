import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';
import { SkillDto } from './dto/skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  private mapToSkillDto(skill: Skill): SkillDto {
    return {
      id: skill.id,
      name: skill.name,
      icon: skill.icon,
      image: skill.image,
      link: skill.link,
      type: skill.type,
    };
  }

  @Get()
  async getAllSkills(): Promise<SkillDto[]> {
    const skills = await this.skillsService.getAllSkills();
    return skills.map(this.mapToSkillDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SkillDto> {
    const skill = await this.skillsService.findOne(id);
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return this.mapToSkillDto(skill);
  }

  @Post()
  async create(@Body() skill: Omit<Skill, 'id'>): Promise<SkillDto> {
    const newSkill = await this.skillsService.create(skill);
    return this.mapToSkillDto(newSkill);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedSkill: Partial<Skill>,
  ): Promise<SkillDto> {
    const updated = await this.skillsService.update(id, updatedSkill);
    return this.mapToSkillDto(updated);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.skillsService.delete(id);
  }
}
