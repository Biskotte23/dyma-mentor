import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthSignInDTO } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInTokenDTO } from './dto/signin-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signIn({
    email,
    password,
  }: AuthSignInDTO): Promise<SignInTokenDTO> {
    const user = await this.userService.findOneByEmail(email);

    if (!this.arePasswordsEqualed(user.passwordHash, password)) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async arePasswordsEqualed(p1: string, p2: string): Promise<boolean> {
    return await compare(p1, p2);
  }
}
