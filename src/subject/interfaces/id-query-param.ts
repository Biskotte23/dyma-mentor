import { IsNumberString } from 'class-validator';

export class IdQueryParam {
  @IsNumberString()
  id: number;
}
