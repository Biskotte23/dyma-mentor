import { IsString } from 'class-validator';

export class CreateLevelDTO {
  @IsString()
  name: string;
}
