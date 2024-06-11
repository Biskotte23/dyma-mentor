import { CACHE_MANAGER, Cache as CacheManager } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import { NewSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @Inject(CACHE_MANAGER) private cacheManager: CacheManager,
  ) {}

  public async getAllSubjects(): Promise<Subject[]> {
    const subjectCache = await this.cacheManager.get<Subject[]>(
      'getAllSubjects',
    );

    if (!subjectCache) {
      const subjects = await this.subjectRepository.find();
      await this.cacheManager.set('getAllSubjects', subjects);
      return subjects;
    }

    return subjectCache;
  }

  public async getSubjectById(id: number): Promise<Subject> {
    return await this.subjectRepository.findOneBy({ id: id });
  }

  private async getSubjectByName(name: string): Promise<Subject> {
    return await this.subjectRepository.findOneBy({ name: name });
  }

  // public async getFavoriteSubject(): Promise<Subject> {
  //   return Promise.resolve({ id: 0, name: 'Maths' });
  // }

  // public async getSubjectWithItsLevel(name: string): Promise<SubjectWithLevel> {
  //   const subject = await this.getSubjectByName(name);

  //   return {
  //     subject: {
  //       id: subject.id,
  //       name: subject.name,
  //     },
  //     level: subject.level
  //       ? {
  //           id: subject.level.id,
  //           name: subject.level.name,
  //         }
  //       : null,
  //   };
  // }

  public async addSubject(subject: NewSubject): Promise<Subject> {
    const newSubject = await this.subjectRepository.save({
      name: subject.name,
    });
    return newSubject;
  }
}
