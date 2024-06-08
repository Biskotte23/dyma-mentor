import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

abstract class DatabaseConfig {
  public constructor(private options: DataSourceOptions) {
    console.log('OPTIONS', options);
  }

  public getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      ...this.options,
      synchronize: false,
      // entities: ['dist/**/*.entity{.ts,.js}'],
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    };
  }

  public getSource(): DataSource {
    return new DataSource(this.options);
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

export default new MariadbDatabaseConfig().getSource();
