import { Type } from 'class-transformer';
import { IsDateString, IsNumber, Min, ValidateNested } from 'class-validator';
import { GetAnnounceDTO } from 'src/announce/dto/get-announce.dto';
import { GetUserDTO } from 'src/user/dto/get-user.dto';

export class CreateCourseDTO {
  @ValidateNested()
  @Type(() => GetAnnounceDTO)
  announce: GetAnnounceDTO;

  @IsDateString()
  date: Date;

  @IsNumber()
  @Min(1)
  hours: number;
}

export class CreateCourseWithStudentDTO extends CreateCourseDTO {
  @ValidateNested()
  @Type(() => GetUserDTO)
  student: GetUserDTO;
}
