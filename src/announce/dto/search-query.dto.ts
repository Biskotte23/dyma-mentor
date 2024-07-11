import { IsOptional, IsString } from 'class-validator';

export class SearchQueryDTO {
  @IsOptional()
  @IsString()
  levelName: string;

  @IsOptional()
  @IsString()
  subjectName: string;
}
