import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentVariableService } from 'src/config/services/environment-variable.service';
import { EnvVariable } from 'src/config/enums/environment-variable.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private environmentVariables: EnvironmentVariableService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Auth Guard');
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.environmentVariables.get(EnvVariable.JWT_SECRET),
      });
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
