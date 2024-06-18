import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceController } from './announce.controller';
import { Announce } from './announce.entity';
import { AnnounceService } from './announce.service';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [TypeOrmModule.forFeature([Announce]), LevelModule, SubjectModule],
  controllers: [AnnounceController],
  providers: [AnnounceService],
  exports: [AnnounceService],
})
export class AnnounceModule {}
