import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnounceController } from './announce.controller';
import { Announce } from './announce.entity';
import { AnnounceService } from './announce.service';
import { LevelModule } from 'src/level/level.module';
import { SubjectModule } from 'src/subject/subject.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/auth/config/jwt.config';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announce]),
    LevelModule,
    SubjectModule,
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
  ],
  controllers: [AnnounceController],
  providers: [AnnounceService],
  exports: [AnnounceService],
})
export class AnnounceModule {}
