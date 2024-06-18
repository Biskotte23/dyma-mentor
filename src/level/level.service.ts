import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from './level.entity';
import { CreateLevelDTO } from './dto/create-level.dto';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>,
  ) {}

  public async findAll(): Promise<Level[]> {
    return await this.levelRepository.find();
  }

  public async findOneByName(name: string): Promise<Level> {
    const level = await this.levelRepository.findOneBy({ name });

    if (!level) {
      throw new HttpException(
        `No level found with name '${name}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    return level;
  }

  public async createLevel(level: CreateLevelDTO): Promise<Level> {
    return await this.levelRepository.save({ name: level.name });
  }
}
