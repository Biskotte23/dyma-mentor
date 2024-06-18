import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from 'src/subject/subject.service';
import { AnnounceService } from './announce.service';
import { LevelService } from 'src/level/level.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Announce } from './announce.entity';

describe('AnnounceService', () => {
  let service: AnnounceService;
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
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AnnounceService>(AnnounceService);
  });

  describe('createAnnounce', () => {
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
      const result = await service.createAnnounce(announceToCreate);

      expect(levelSpy).toHaveBeenCalledWith('test-level');
      expect(levelSpy).toHaveBeenCalledTimes(1);
      expect(subjectSpy).toHaveBeenCalledWith('test-subject');
      expect(subjectSpy).toHaveBeenCalledTimes(1);
      expect(repositorySpy).toHaveBeenCalledWith({
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
      expect(repositorySpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual({
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

    it('Should not create an announce if level is empty', async () => {
      levelSpy.mockResolvedValue(null);
      subjectSpy.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });

      await expect(service.createAnnounce(announceToCreate)).rejects.toThrow(
        'No level found',
      );
    });

    it('Should not create an announce if subject is empty', async () => {
      levelSpy.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
      subjectSpy.mockResolvedValue(null);

      await expect(service.createAnnounce(announceToCreate)).rejects.toThrow(
        'No subject found',
      );
    });
  });

  describe('searchAnnounce', () => {
    const levelSpy = jest.spyOn(levelService, 'findOneByName');
    const subjectSpy = jest.spyOn(subjectService, 'findOneByName');
    const repositorySpy = jest.spyOn(repository, 'findBy');

    const announceToSearch = {
      levelName: 'test-level',
      subjectName: 'test-subject',
    };

    beforeAll(() => {
      jest.clearAllMocks();
    });

    it('Should find an announce', async () => {
      levelSpy.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
      subjectSpy.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });
      repositorySpy.mockResolvedValue([
        {
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
        },
      ]);
      const result = await service.searchAnnounce(announceToSearch);

      expect(levelSpy).toHaveBeenCalledWith('test-level');
      expect(levelSpy).toHaveBeenCalledTimes(1);
      expect(subjectSpy).toHaveBeenCalledWith('test-subject');
      expect(subjectSpy).toHaveBeenCalledTimes(1);
      expect(repositorySpy).toHaveBeenCalledWith({
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
      expect(repositorySpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([
        {
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
        },
      ]);
    });

    it('Should throw an error if announce not found', async () => {
      repositorySpy.mockResolvedValue(null);

      await expect(service.searchAnnounce(announceToSearch)).rejects.toThrow(
        "No annouces found with level 'test-level' and subject 'test-subject'",
      );
    });
  });
});
