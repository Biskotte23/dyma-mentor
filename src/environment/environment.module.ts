import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  environmentConfig,
  environmentConfigSchema,
} from './environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentConfig],
      validationSchema: Joi.object(environmentConfigSchema),
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
