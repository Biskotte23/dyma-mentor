import { CACHE_MANAGER, Cache as CacheManager } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announce } from './announce.entity';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(Announce)
    private announceRepository: Repository<Announce>,
    @Inject(CACHE_MANAGER) private cacheManager: CacheManager,
  ) {}
}
