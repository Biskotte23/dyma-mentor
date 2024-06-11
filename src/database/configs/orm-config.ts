import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions, DataSource } from 'typeorm';

export type OrmConfigOptions = Omit<
  DataSourceOptions,
  'synchronize' | 'entities' | 'migrations'
>;

export abstract class OrmConfig {
  private options: DataSourceOptions;

  public constructor(options: OrmConfigOptions) {
    this.options = {
      ...options,
      synchronize: false,
    } as DataSourceOptions;
  }

  public getTypeOrmModuleOptions(): TypeOrmModuleOptions {
    return {
      ...this.options,
      autoLoadEntities: true,
      migrations: [`${__dirname}/database/migrations/*{.ts,.js}`],
    };
  }

  public getSource(): DataSource {
    const options = {
      ...this.options,
      entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
    };
    return new DataSource(options);
  }
}
