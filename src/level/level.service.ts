import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './level.entity';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  public async getAllLevels(): Promise<Level[]> {
    return await this.levelRepository.find();
  }

  public async getLevelByName(name: string): Promise<Level> {
    return await this.levelRepository.findOneBy({ name: name });
  }

  // public async getLevelWithItsSubjects(
  //   name: string,
  // ): Promise<LevelWithSubjects> {
  //   const level = await this.getLevelByName(name);

  //   return {
  //     level: {
  //       id: level.id,
  //       name: level.name,
  //     },
  //     subjects: level.subjects.map((subject) => ({
  //       id: subject.id,
  //       name: subject.name,
  //     })),
  //   };
  // }
}
