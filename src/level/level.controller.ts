import { Body, Controller, Post } from '@nestjs/common';
import { LevelService } from './level.service';
import { Level } from './level.entity';
import { CreateLevelDTO } from './dto/create-level.dto';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  async createLevel(@Body() level: CreateLevelDTO): Promise<Level> {
    return await this.levelService.createLevel(level);
  }
}
