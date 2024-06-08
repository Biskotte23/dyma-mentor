import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { NewSubject, SubjectWithLevel } from './subject';
import { CACHE_MANAGER, Cache as CacheManager } from '@nestjs/cache-manager';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: CacheManager,
  ) {}

  public async getAllSubjects(): Promise<SubjectEntity[]> {
    const subjectCache = await this.cacheManager.get<SubjectEntity[]>(
      'getAllSubjects',
    );

    if (!subjectCache) {
      const subjects = await this.subjectRepository.find();
      await this.cacheManager.set('getAllSubjects', subjects);
      return subjects;
    }

    return subjectCache;
  }

  public async getSubjectById(id: number): Promise<SubjectEntity> {
    return await this.subjectRepository.findOneBy({ id: id });
  }

  private async getSubjectByName(name: string): Promise<SubjectEntity> {
    return await this.subjectRepository.findOneBy({ name: name });
  }

  public async getFavoriteSubject(): Promise<SubjectEntity> {
    return Promise.resolve({ id: 0, name: 'Maths' });
  }

  public async getSubjectWithItsLevel(name: string): Promise<SubjectWithLevel> {
    const subject = await this.getSubjectByName(name);

    return {
      subject: {
        id: subject.id,
        name: subject.name,
      },
      level: subject.level
        ? {
            id: subject.level.id,
            name: subject.level.name,
          }
        : null,
    };
  }

  public async addSubject(subject: NewSubject): Promise<SubjectEntity> {
    const newSubject = await this.subjectRepository.save({
      name: subject.name,
    });
    return newSubject;
  }
}
