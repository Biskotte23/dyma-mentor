import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { DatabaseConfig } from './database.config';

type MariadbConfigOptions = Required<
  Pick<
    MysqlConnectionOptions,
    'host' | 'port' | 'username' | 'password' | 'database'
  >
>;

export class MariadbConfig extends DatabaseConfig {
  constructor(options: MariadbConfigOptions) {
    super({
      type: 'mariadb',
      ...options,
    });
  }
}
