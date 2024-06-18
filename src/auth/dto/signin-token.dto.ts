import { IsString } from 'class-validator';

export class SignInTokenDTO {
  @IsString()
  access_token: string;
}
