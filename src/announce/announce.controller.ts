import { Controller } from '@nestjs/common';
import { AnnounceService } from './announce.service';

@Controller('announces')
export class AnnounceController {
  constructor(private readonly announceService: AnnounceService) {}
}
