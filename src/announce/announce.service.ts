import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { SubjectService } from 'src/subject/subject.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Announce } from './announce.entity';
import { CreateAnnounceWithTeacherDTO } from './dto/create-announce.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AnnounceService {
  constructor(
    private levelService: LevelService,
    private subjectService: SubjectService,
    private userService: UserService,
    @InjectRepository(Announce)
    private announceRepository: Repository<Announce>,
  ) {}

  public async createAnnounce(
    announce: CreateAnnounceWithTeacherDTO,
  ): Promise<Announce> {
    const {
      price,
      level: { name: levelName },
      subject: { name: subjectName },
      teacher: { id: teacherId },
    } = announce;

    const teacher = await this.userService.findOneById(teacherId);
    if (!teacher)
      throw new HttpException(`No user found`, HttpStatus.NOT_FOUND);

    const level = await this.levelService.findOneByName(levelName);
    if (!level) throw new HttpException(`No level found`, HttpStatus.NOT_FOUND);

    const subject = await this.subjectService.findOneByName(subjectName);
    if (!subject)
      throw new HttpException(`No subject found`, HttpStatus.NOT_FOUND);

    return this.announceRepository.save({
      level,
      subject,
      price,
      teacher,
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

  public async findOneById(id: number): Promise<Announce> {
    return await this.announceRepository.findOneBy({ id });
  }

  public async findAllFromTeacher(teacher: User): Promise<Announce[]> {
    return await this.announceRepository.find({
      where: { teacher },
      relations: ['courses'],
    });
  }
}
