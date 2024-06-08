import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelEntity } from './entities/level.entity';
import { LevelWithSubjects } from './level';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
  ) {}

  public async getAllLevels(): Promise<LevelEntity[]> {
    return await this.levelRepository.find();
  }

  public async getLevelByName(name: string): Promise<LevelEntity> {
    return await this.levelRepository.findOneBy({ name: name });
  }

  public async getLevelWithItsSubjects(
    name: string,
  ): Promise<LevelWithSubjects> {
    const level = await this.getLevelByName(name);

    return {
      level: {
        id: level.id,
        name: level.name,
      },
      subjects: level.subjects.map((subject) => ({
        id: subject.id,
        name: subject.name,
      })),
    };
  }
}
