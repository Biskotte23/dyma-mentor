import { Controller } from '@nestjs/common';
import { LevelService } from './level.service';

@Controller('levels')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  // @Get(':name/subjects')
  // async getLevelWithItsSubjects(
  //   @Param('name') name: string,
  // ): Promise<LevelWithSubjects> {
  //   return await this.levelService.getLevelWithItsSubjects(name);
  // }
}
