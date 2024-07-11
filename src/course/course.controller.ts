import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Course } from './course.entity';
import { CourseService } from './course.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/user/interfaces/role';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Student)
  public async createCourse(
    @Body() body: CreateCourseDTO,
    @Req() { user },
  ): Promise<Course> {
    const student = { id: user.sub };
    return await this.courseService.createCourse({ ...body, student });
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Student, Role.Teacher)
  public async findMyCourses(@Req() { user }): Promise<Course[]> {
    const studentId = user.sub;
    return await this.courseService.findStudentCourses(studentId);
  }
}
