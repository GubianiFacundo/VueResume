import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SkillsService } from './../src/skills/skills.service';
import { SkillType } from './../src/skills/enums/skill-type.enum';

describe('Skills API (e2e)', () => {
  let app: INestApplication;
  let mockSkillsService: Partial<SkillsService>;

  beforeAll(async () => {

    mockSkillsService = {
      getAllSkills: jest.fn().mockResolvedValue([
        { id: 1, name: 'Skill 1', type: SkillType.FRONTEND },
        { id: 2, name: 'Skill 2', type: SkillType.BACKEND },
      ]),
      findOne: jest.fn().mockImplementation((id) => {
        const skills = [
          { id: 1, name: 'Skill 1', type: SkillType.FRONTEND },
          { id: 2, name: 'Skill 2', type: SkillType.BACKEND },
        ];
        return skills.find((skill) => skill.id === id) || null;
      }),
      create: jest.fn().mockImplementation((skill) => ({
        id: Math.floor(Math.random() * 1000),
        ...skill,
      })),
      delete: jest.fn().mockResolvedValue({}),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(SkillsService)
      .useValue(mockSkillsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/skills (GET) should return all skills', async () => {
    const response = await request(app.getHttpServer())
      .get('/skills')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('type');
  });

  it('/api/skills (POST) should create a new skill', async () => {
    const newSkill = {
      name: 'New Skill',
      type: 'Frontend Skills',
      icon: 'mdi mdi-new-skill',
    };

    const response = await request(app.getHttpServer())
      .post('/skills')
      .send(newSkill)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newSkill.name);
    expect(response.body.type).toBe(newSkill.type);
  });

  it('/api/skills/:id (DELETE) should delete a skill', async () => {
    const skillId = 1;

    await request(app.getHttpServer())
      .delete(`/skills/${skillId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/skills/${skillId}`)
      .expect(404);
  });
});