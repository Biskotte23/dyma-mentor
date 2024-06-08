import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { LevelModule } from './level/level.module';
import { SubjectModule } from './subject/subject.module';
import { MariadbDatabaseConfig } from './database/database-config';

const options = new MariadbDatabaseConfig().getTypeOrmModuleOptions();
console.log('OPTIONS', options);

@Module({
  imports: [
    EnvironmentModule,
    LevelModule,
    SubjectModule,
    TypeOrmModule.forRoot(options),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
