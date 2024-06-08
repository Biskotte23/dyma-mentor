import * as dotenvFlow from 'dotenv-flow';
dotenvFlow.config({ default_node_env: 'development' });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environmentService = app.get(EnvironmentService);
  await app.listen(environmentService.environmentVariables.port);
}

bootstrap();
