import { CACHE_MANAGER, Cache as CacheManager } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { Subject } from './subject.entity';

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

  public async findOneById(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new HttpException(
        `No subject found with ID '${id}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    return subject;
  }

  public async findOneByName(name: string): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ name });

    if (!subject) {
      throw new HttpException(
        `No subject found with name '${name}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    return subject;
  }

  public async createSubject(subject: CreateSubjectDTO): Promise<Subject> {
    return await this.subjectRepository.save({
      name: subject.name,
    });
  }
}
