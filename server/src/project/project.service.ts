import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
      @InjectRepository(Project)
      private readonly projectRepository: Repository<Project>,
    ) { }
  
    async getAllProjects(): Promise<ProjectDto[]> {
      return await this.projectRepository.find().then((projects) => {
        return projects.map((project) => ({
          id: project.id,
          name: project.name,
          description: project.description,
          data: project.data,
        }));
      });
    }
}
