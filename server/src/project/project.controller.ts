import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  async getAllProjects(): Promise<ProjectDto[]> {
    return this.projectService.getAllProjects();
  }
}
