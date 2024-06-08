import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './error/exception-filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  @UseFilters(HttpExceptionFilter)
  getHello(): string {
    return this.appService.getHello();
  }
}
