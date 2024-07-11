import { IsNumber, IsPositive } from 'class-validator';

export class GetUserDTO {
  @IsNumber()
  @IsPositive()
  id: number;
}
