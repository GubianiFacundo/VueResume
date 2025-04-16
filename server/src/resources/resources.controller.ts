import { Controller, Get } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourceDto } from './dto/resource.dto';
import { Resource } from './entities/resource.entity';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  private mapToResourceDto(resource: Resource): ResourceDto {
    return {
      id: resource.id,
      name: resource.name,
      category: resource.category,
      description: resource.description,
      link: resource.link,
      fromdate: resource.fromdate,
      todate: resource.todate,
    };
  }

  @Get()
  async getAllResources(): Promise<ResourceDto[]> {
    const resources = await this.resourcesService.getAllResources();
    return resources.map(this.mapToResourceDto);
  }
}
