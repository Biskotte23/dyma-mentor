import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { environmentConfig } from './environment.config';

@Injectable()
export class EnvironmentService {
  constructor(
    @Inject(environmentConfig.KEY)
    public readonly environmentVariables: ConfigType<typeof environmentConfig>,
  ) {}
}
