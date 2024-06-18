import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariableService } from './config/services/environment-variable.service';
import { EnvVariable } from './config/enums/environment-variable.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const environmentVariable = app.get(EnvironmentVariableService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(environmentVariable.get(EnvVariable.PORT));
}

bootstrap();
