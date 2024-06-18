import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announce } from './announce.entity';
import { LevelService } from 'src/level/level.service';
import { SubjectService } from 'src/subject/subject.service';
import { CreateAnnounceDTO } from './interfaces/create-announce';

@Injectable()
export class AnnounceService {
  constructor(
    private levelService: LevelService,
    private subjectService: SubjectService,
    @InjectRepository(Announce)
    private announceRepository: Repository<Announce>,
  ) {}

  public async createAnnounce(announce: CreateAnnounceDTO): Promise<Announce> {
    const {
      price,
      level: { name: levelName },
      subject: { name: subjectName },
    } = announce;

    const level = await this.levelService.findOneByName(levelName);
    if (!level) {
      throw new HttpException(`No level found`, HttpStatus.NOT_FOUND);
    }
    const subject = await this.subjectService.findOneByName(subjectName);
    if (!subject) {
      throw new HttpException(`No subject found`, HttpStatus.NOT_FOUND);
    }

    return this.announceRepository.save({
      level,
      subject,
      price,
    });
  }

  public async searchAnnounce({
    levelName,
    subjectName,
  }: {
    levelName: string;
    subjectName: string;
  }): Promise<Announce[]> {
    const level = await this.levelService.findOneByName(levelName);
    const subject = await this.subjectService.findOneByName(subjectName);

    const announces = await this.announceRepository.findBy({
      level,
      subject,
    });

    if (!announces) {
      throw new HttpException(
        `No annouces found with level '${levelName}' and subject '${subjectName}'`,
        HttpStatus.NOT_FOUND,
      );
    }

    return announces;
  }
}
