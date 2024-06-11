import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

abstract class DatabaseConfig {
  private options: DataSourceOptions;

  public constructor(options: DataSourceOptions) {
    this.options = {
      ...options,
      synchronize: false,
      migrations: [`${__dirname}/database/migrations/*{.ts,.js}`],
    };
  }

  public getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      ...this.options,
      autoLoadEntities: true,
    };
  }

  public getSource(): DataSource {
    const options = {
      ...this.options,
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    };
    return new DataSource(options);
  }
}

export class MariadbDatabaseConfig extends DatabaseConfig {
  constructor() {
    super({
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
  }
}
