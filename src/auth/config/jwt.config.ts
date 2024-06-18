import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { EnvVariable } from 'src/config/enums/environment-variable.enum';
import { EnvironmentVariableService } from 'src/config/services/environment-variable.service';

@Injectable()
export class JwtConfig implements JwtOptionsFactory {
  constructor(
    private readonly environmentVariables: EnvironmentVariableService,
  ) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.environmentVariables.get(EnvVariable.JWT_SECRET),
    };
  }
}
