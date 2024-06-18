import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { EnvironmentVariableService } from 'src/config/services/environment-variable.service';

describe('SubjectService', () => {
  let service: SubjectService;

  const environmentVariables = {
    get: jest.fn(),
  };

  const cacheManager = {
    get: jest.fn(),
  };

  const repository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: EnvironmentVariableService,
          useValue: environmentVariables,
        },
        { provide: CACHE_MANAGER, useValue: cacheManager },
        { provide: getRepositoryToken(Subject), useValue: repository },
      ],
    }).compile();
    service = module.get<SubjectService>(SubjectService);
  });

  describe('findOneById', () => {
    it('Should retrieve subject from an id', async () => {
      const spy = jest
        .spyOn(repository, 'findOneBy')
        .mockImplementation(() => ({
          id: 1,
          name: 'test-subject',
        }));
      const result = await service.findOneById(1);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toStrictEqual({
        id: 1,
        name: 'test-subject',
      });
    });

    it('Should throw not found error', async () => {
      jest.spyOn(repository, 'findOneBy').mockImplementation(() => null);

      await expect(service.findOneById(1)).rejects.toThrow(
        "No subject found with ID '1'",
      );
    });
  });
});
