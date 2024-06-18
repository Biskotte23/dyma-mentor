import { Controller, Query } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { Body, Get, Post } from '@nestjs/common';
import { CreateAnnounceDTO } from './interfaces/create-announce';
import { SearchQuery } from './interfaces/search-query';

@Controller('announces')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Post()
  createAnnounce(@Body() body: CreateAnnounceDTO) {
    return this.announceService.createAnnounce(body);
  }

  @Get('search')
  searchAnnounce(@Query() { levelName, subjectName }: SearchQuery) {
    return this.announceService.searchAnnounce({
      levelName,
      subjectName,
    });
  }
}
