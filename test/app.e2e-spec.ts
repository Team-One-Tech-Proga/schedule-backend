import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaClient } from '@prisma/client';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from '../src/filters/prisma-client-exception.filter';

describe('App (e2e)', () => {
  let app: INestApplication;
  const prisma = new PrismaClient({
    //datasourceUrl: '',
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

    await app.init();

    //console.log('auth beforeAll' + new Date());
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.group.deleteMany({});
    await prisma.teacher.deleteMany({});
    await prisma.university.deleteMany({});
    //throw new Error();
    const createdUniversity = await prisma.university.create({
      data: {
        name: 'University',
        slug: 'university',
      },
    });
    const createdGroup = await prisma.group.create({
      data: {
        name: 'Group',
        slug: 'group',
        universityId: createdUniversity.id,
      },
    });
    universityId = createdUniversity.id;
    groupId = createdGroup.id;
    user.groupId = groupId;
  }, 10000);

  let jwtToken: string = '';
  let universityId = '';
  let groupId = '';
  const user = {
    firstName: 'First name',
    username: 'testuser',
    password: '12345678',
    groupId: '',
  };

  describe('Home', () => {
    it('(GET) - Get /', async () => {
      return request(app.getHttpServer()).get('/').expect(404);
    });
  });

  describe('Auth', () => {
    it('(POST) - Register a new user', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
        });
    });

    it('(GET) - Login user', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: user.username, password: user.password })
        .expect(201)
        .then((res) => {
          expect(res.body.access_token).toBeDefined();
          jwtToken = res.body.access_token;
        });
    });

    it('(GET) - Get user profile', async () => {
      return request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body.username).toEqual(user.username);
        });
    });
  });

  describe('Auth cases', () => {
    it('(POST) - Prevent register a new user with same username', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(user)
        .expect(409);
    });
  });

  describe('Universities CRUD', () => {
    const university = {
      name: 'Test University',
      slug: 'testuniversity',
    };
    let createdUniversity;

    it('(GET) - Get groups', () => {
      return request(app.getHttpServer())
        .get('/universities')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(1);
        });
    });

    it('(POST) - Create new University', async () => {
      return request(app.getHttpServer())
        .post('/universities')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(university)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toEqual(university.name);
          createdUniversity = res.body;
        });
    });

    it('(GET) - Get a University by ID', async () => {
      return request(app.getHttpServer())
        .get(`/universities/${createdUniversity?.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toEqual(createdUniversity.id);
        });
    });

    it('(PATCH) - Update a University by ID', async () => {
      const university = { name: 'Updated name' };
      return request(app.getHttpServer())
        .patch(`/universities/${createdUniversity?.id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(university)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.name).toEqual(university.name);
        });
    });

    it('(DELETE) - Delete a University by ID', async () => {
      return request(app.getHttpServer())
        .delete(`/universities/${createdUniversity?.id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });
  });

  describe('Groups CRUD', () => {
    const group = {
      name: 'Test University',
      slug: 'testuniversity',
      universityId: '',
    };

    let createdGroup;

    it('(POST) - Create new Group', async () => {
      group.universityId = universityId;
      return request(app.getHttpServer())
        .post('/groups')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(group)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toEqual(group.name);
          createdGroup = res.body;
        });
    });

    it('(GET) - Get groups', () => {
      return request(app.getHttpServer())
        .get('/groups')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('(GET) - Get a Group by ID', async () => {
      return request(app.getHttpServer())
        .get(`/groups/${createdGroup?.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toEqual(createdGroup.id);
        });
    });

    it('(PATCH) - Update a Group by ID', async () => {
      const group = { name: 'Updated name' };
      return request(app.getHttpServer())
        .patch(`/groups/${createdGroup?.id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(group)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.name).toEqual(group.name);
        });
    });

    it('(DELETE) - Delete a Group by ID', async () => {
      return request(app.getHttpServer())
        .delete(`/groups/${createdGroup?.id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });
  });

  describe('Teachers CRUD', () => {
    const teacher = {
      name: 'Ivanov Ivan',
      slug: 'ivanov-ivan',
      universityId: '',
    };

    let createdTeacher;

    it('(POST) - Create new Teacher', async () => {
      teacher.universityId = universityId;
      return request(app.getHttpServer())
        .post('/teachers')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(teacher)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toEqual(teacher.name);
          createdTeacher = res.body;
        });
    });

    it('(GET) - Get teachers', () => {
      return request(app.getHttpServer())
        .get('/teachers')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    it('(GET) - Get a Teacher by ID', async () => {
      return request(app.getHttpServer())
        .get(`/teachers/${createdTeacher?.id}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toEqual(createdTeacher.id);
          expect(res.body.name).toEqual(createdTeacher.name);
        });
    });

    it('(PATCH) - Update a Teacher by ID', async () => {
      const teacher = { name: 'Ivanov Michel' };
      return request(app.getHttpServer())
        .patch(`/teachers/${createdTeacher?.id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .send(teacher)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          expect(res.body.id).toEqual(createdTeacher.id);
          expect(res.body.name).toEqual(teacher.name);
        });
    });

    it('(DELETE) - Delete a Teacher by ID', async () => {
      return request(app.getHttpServer())
        .delete(`/teachers/${createdTeacher?.id}`)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
        });
    });
  });
});
