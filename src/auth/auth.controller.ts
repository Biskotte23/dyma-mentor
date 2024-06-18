import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/auth-signin.dto';
import { SignInTokenDTO } from './dto/signin-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  public async signIn(@Body() body: AuthSignInDTO): Promise<SignInTokenDTO> {
    return this.authService.signIn(body);
  }
}
