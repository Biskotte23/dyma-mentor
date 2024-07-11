import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/auth/config/jwt.config';
import { ConfigModule } from 'src/config/config.module';
import { AnnounceModule } from 'src/announce/announce.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    UserModule,
    AnnounceModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
