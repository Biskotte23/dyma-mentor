import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../interfaces/role';

export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}
