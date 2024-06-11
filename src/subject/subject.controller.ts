import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewSubject, Subject } from './subject';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  public async getAllSubjects(): Promise<Subject[]> {
    return await this.subjectService.getAllSubjects();
  }

  // @Get('favorite')
  // public async getFavoriteSubject(): Promise<Subject> {
  //   return await this.subjectService.getFavoriteSubject();
  // }

  @Get(':id')
  public async getSubjectById(@Param('id') id: string): Promise<Subject> {
    const formattedId = parseInt(id);
    const subject = await this.subjectService.getSubjectById(formattedId);

    return subject;
  }

  // @Get(':name/level')
  // public async getSubjectWithItsLevel(
  //   @Param('name') name: string,
  // ): Promise<SubjectWithLevel> {
  //   return await this.subjectService.getSubjectWithItsLevel(name);
  // }

  @Post()
  public async addSubject(@Body() subject: NewSubject): Promise<Subject> {
    return await this.subjectService.addSubject(subject);
  }
}
