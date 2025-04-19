import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ResourcesService } from './../src/resources/resources.service';
import { CategoryType } from './../src/resources/enums/category-type.enum';

describe('Resources API (e2e)', () => {
  let app: INestApplication;
  let mockResourcesService: Partial<ResourcesService>;

  beforeAll(async () => {
    mockResourcesService = {
      getAllResources: jest.fn().mockResolvedValue([
        {
          id: 1,
          name: 'Resource 1',
          description: 'Description 1',
          link: 'https://example.com/resource1',
          category: CategoryType.EDUCATION,
          fromdate: new Date('2023-01-01'),
          todate: new Date('2023-12-31'),
        },
        {
          id: 2,
          name: 'Resource 2',
          description: 'Description 2',
          link: 'https://example.com/resource2',
          category: CategoryType.JOB,
          fromdate: new Date('2022-01-01'),
          todate: new Date('2022-12-31'),
        },
      ]),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ResourcesService)
      .useValue(mockResourcesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/resources (GET) should return all resources', async () => {
    const response = await request(app.getHttpServer())
      .get('/resources')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('name', 'Resource 1');
    expect(response.body[0]).toHaveProperty('description', 'Description 1');
    expect(response.body[0]).toHaveProperty('link', 'https://example.com/resource1');
    expect(response.body[0]).toHaveProperty('category', CategoryType.EDUCATION);
  });
});