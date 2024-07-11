import { IsNumber } from 'class-validator';

export class GetAnnounceDTO {
  @IsNumber()
  id: number;
}
