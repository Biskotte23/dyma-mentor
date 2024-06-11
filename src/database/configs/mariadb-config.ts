import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { OrmConfig } from './orm-config';

type MariadbDataSourceOptions = Required<
  Pick<
    MysqlConnectionOptions,
    'host' | 'port' | 'username' | 'password' | 'database'
  >
>;

export class MariadbConfig extends OrmConfig {
  constructor(options: MariadbDataSourceOptions) {
    super({
      type: 'mariadb',
      ...options,
    });
  }
}
