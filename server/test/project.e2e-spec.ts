import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProjectService } from './../src/project/project.service';

describe('Projects API (e2e)', () => {
  let app: INestApplication;
  let mockProjectService: Partial<ProjectService>;

  beforeAll(async () => {
    mockProjectService = {
      getAllProjects: jest.fn().mockResolvedValue([
        { id: 1, name: 'Project 1', description: { en: 'Description 1', es: 'Descripcion 1' }, data: { en: 'Data 1', es: 'Datos 1' } },
        { id: 2, name: 'Project 2', description: { en: 'Description 2', es: 'Descripcion 2' }, data: { en: 'Data 2', es: 'Datos 2' } },
      ]),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProjectService)
      .useValue(mockProjectService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/projects (GET) should return all projects', async () => {
    const response = await request(app.getHttpServer())
      .get('/projects')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('name', 'Project 1');
    expect(response.body[0]).toHaveProperty('description', { en: 'Description 1', es: 'Descripcion 1' });
    expect(response.body[0]).toHaveProperty('data', { en: 'Data 1', es: 'Datos 1' });
  });
});