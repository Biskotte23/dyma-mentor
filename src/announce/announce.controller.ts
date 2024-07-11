import { Controller, Query, Req, UseGuards } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { Body, Get, Post } from '@nestjs/common';
import { CreateAnnounceDTO } from './dto/create-announce.dto';
import { SearchQueryDTO } from './dto/search-query.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/user/interfaces/role';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('announces')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Teacher)
  createAnnounce(@Body() body: CreateAnnounceDTO, @Req() { user }) {
    const teacher = { id: user.sub };
    return this.announceService.createAnnounce({ ...body, teacher });
  }

  @Get('search')
  searchAnnounce(@Query() { levelName, subjectName }: SearchQueryDTO) {
    return this.announceService.searchAnnounce({
      levelName,
      subjectName,
    });
  }
}
