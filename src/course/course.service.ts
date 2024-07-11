import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnounceService } from 'src/announce/announce.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseWithStudentDTO } from './dto/create-course.dto';
import { Role } from 'src/user/interfaces/role';

@Injectable()
export class CourseService {
  constructor(
    private userService: UserService,
    private announceService: AnnounceService,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  public async createCourse(
    course: CreateCourseWithStudentDTO,
  ): Promise<Course> {
    const {
      announce: { id: announceId },
      student: { id: studentId },
      date,
      hours,
    } = course;

    const student = await this.userService.findOneById(studentId);
    if (!student)
      throw new HttpException(`No user found`, HttpStatus.NOT_FOUND);
    const announce = await this.announceService.findOneById(announceId);
    if (!announce)
      throw new HttpException(`No announce found`, HttpStatus.NOT_FOUND);

    return this.courseRepository.save({ announce, student, date, hours });
  }

  public async findStudentCourses(userId: number): Promise<Course[]> {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new HttpException(`No user found`, HttpStatus.NOT_FOUND);

    switch (user.role) {
      case Role.Teacher:
        const announces = await this.announceService.findAllFromTeacher(user);
        return announces.flatMap((announce) => announce.courses);
      case Role.Student:
        return this.courseRepository.findBy({ student: user });
      default:
        throw new HttpException(
          'User role not handled',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
