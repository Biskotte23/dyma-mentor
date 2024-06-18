import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Subject } from './subject';
import { SubjectService } from './subject.service';
import { CreateSubjectDTO } from './dto/create-subject.dto';
import { IdQueryParam } from './interfaces/id-query-param';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  public async getAllSubjects(): Promise<Subject[]> {
    return await this.subjectService.getAllSubjects();
  }

  @Get(':id')
  public async findOneById(
    @Param('id', ParseIntPipe) { id }: IdQueryParam,
  ): Promise<Subject> {
    const subject = await this.subjectService.findOneById(id);

    return subject;
  }

  @Post()
  public async createSubject(
    @Body() subject: CreateSubjectDTO,
  ): Promise<Subject> {
    return await this.subjectService.createSubject(subject);
  }
}
