import { EnvVariable } from 'src/config/enums/environment-variable.enum';
import { MariadbConfig } from './configs/mariadb.config';
import { EnvironmentVariableService } from 'src/config/services/environment-variable.service';
import { DatabaseConfig } from './configs/database.config';

export const typeormConfig: DatabaseConfig = new MariadbConfig({
  host: EnvironmentVariableService.get(EnvVariable.DATABASE_HOST),
  port: EnvironmentVariableService.get<number>(EnvVariable.DATABASE_PORT),
  username: EnvironmentVariableService.get(EnvVariable.DATABASE_USERNAME),
  password: EnvironmentVariableService.get(EnvVariable.DATABASE_PASSWORD),
  database: EnvironmentVariableService.get(EnvVariable.DATABASE_NAME),
});

export default typeormConfig.getSource();
