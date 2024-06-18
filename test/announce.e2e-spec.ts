import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnnounceController } from 'src/announce/announce.controller';
import { Announce } from 'src/announce/announce.entity';
import { LevelService } from 'src/level/level.service';
import { SubjectService } from 'src/subject/subject.service';
import * as request from 'supertest';
import { AnnounceService } from 'src/announce/announce.service';

describe('AnnounceController (e2e)', () => {
  let app: INestApplication;
  const subjectService = {
    findOneByName: jest.fn(),
  };
  const levelService = {
    findOneByName: jest.fn(),
  };
  const repository = {
    save: jest.fn(),
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AnnounceController],
      providers: [
        AnnounceService,
        {
          provide: getRepositoryToken(Announce),
          useValue: repository,
        },
      ],
    })
      .useMocker((token) => {
        if (token === SubjectService) return subjectService;
        if (token === LevelService) return levelService;
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/announces (POST)', () => {
    const levelSpy = jest.spyOn(levelService, 'findOneByName');
    const subjectSpy = jest.spyOn(subjectService, 'findOneByName');
    const repositorySpy = jest.spyOn(repository, 'save');

    const announceToCreate = {
      price: 100,
      level: {
        name: 'test-level',
      },
      subject: {
        name: 'test-subject',
      },
    };

    it('Should create an announce', async () => {
      levelSpy.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
      subjectSpy.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });
      repositorySpy.mockResolvedValue({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });

      await request(app.getHttpServer())
        .post('/announces')
        .send(announceToCreate)
        .expect(201)
        .expect({
          id: 1,
          price: 100,
          level: {
            id: 1,
            name: 'test-level',
          },
          subject: {
            id: 1,
            name: 'test-subject',
          },
        });
    });

    it('Should not create an announce with bad request', async () => {
      await request(app.getHttpServer())
        .post('/announces')
        .send({ ...announceToCreate, price: -1 })
        .expect(400)
        .expect({
          message: ['price must not be less than 0'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });

  describe('/announces/search (GET)', () => {
    const levelSpy = jest.spyOn(levelService, 'findOneByName');
    const subjectSpy = jest.spyOn(subjectService, 'findOneByName');
    const repositorySpy = jest.spyOn(repository, 'findBy');

    const announceToSearch = {
      levelName: 'test-level',
      subjectName: 'test-subject',
    };

    it('Should retrieve an announce', async () => {
      levelSpy.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
      subjectSpy.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });
      repositorySpy.mockResolvedValue({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });

      await request(app.getHttpServer())
        .get('/announces/search')
        .query(announceToSearch)
        .expect(200)
        .expect({
          id: 1,
          price: 100,
          level: {
            id: 1,
            name: 'test-level',
          },
          subject: {
            id: 1,
            name: 'test-subject',
          },
        });

      expect(levelSpy).toHaveBeenCalledWith('test-level');
      expect(subjectSpy).toHaveBeenCalledWith('test-subject');
    });
  });
});
