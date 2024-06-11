import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announce } from './announce.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { AnnounceController } from './announce.controller';
import { AnnounceService } from './announce.service';

@Module({
  imports: [TypeOrmModule.forFeature([Announce]), CacheModule.register()],
  controllers: [AnnounceController],
  providers: [AnnounceService],
  exports: [AnnounceService],
})
export class AnnounceModule {}
