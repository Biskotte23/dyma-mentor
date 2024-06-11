import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { AnnounceModule } from './announce/announce.module';
import { LevelModule } from './level/level.module';
import { SubjectModule } from './subject/subject.module';
import ormConfig from './database/ormconfig';

@Module({
  imports: [
    AnnounceModule,
    EnvironmentModule,
    LevelModule,
    SubjectModule,
    TypeOrmModule.forRoot(ormConfig.getTypeOrmModuleOptions()),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
