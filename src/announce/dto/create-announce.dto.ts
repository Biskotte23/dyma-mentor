import { Type } from 'class-transformer';
import { IsNumber, Min, ValidateNested } from 'class-validator';
import { CreateLevelDTO } from 'src/level/dto/create-level.dto';
import { CreateSubjectDTO } from 'src/subject/dto/create-subject.dto';
import { GetUserDTO } from 'src/user/dto/get-user.dto';

export class CreateAnnounceDTO {
  @ValidateNested()
  @Type(() => CreateLevelDTO)
  level: CreateLevelDTO;

  @ValidateNested()
  @Type(() => CreateSubjectDTO)
  subject: CreateSubjectDTO;

  @IsNumber()
  @Min(0)
  price: number;
}

export class CreateAnnounceWithTeacherDTO extends CreateAnnounceDTO {
  @ValidateNested()
  @Type(() => GetUserDTO)
  teacher: GetUserDTO;
}
