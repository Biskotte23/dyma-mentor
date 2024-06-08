import * as Joi from 'joi';
import { Environment } from './environment.enum';
import { registerAs } from '@nestjs/config';

interface EnvironmentConfig {
  port: number;
  environment: Environment;
}

export const environmentConfig = registerAs<EnvironmentConfig>(
  'Environment',
  () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    environment:
      (process.env.NODE_ENV as Environment) || Environment.Development,
  }),
);

export const environmentConfigSchema = {
  PORT: Joi.number(),
  NODE_ENV: Joi.string(),
};
