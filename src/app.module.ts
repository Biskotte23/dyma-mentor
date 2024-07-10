import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnounceModule } from './announce/announce.module';
import { LevelModule } from './level/level.module';
import { SubjectModule } from './subject/subject.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeormConfig } from './database/typeorm.config';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    AnnounceModule,
    LevelModule,
    SubjectModule,
    TypeOrmModule.forRoot(typeormConfig.getTypeOrmModuleOptions()),
    CacheModule.register(),
    UserModule,
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
