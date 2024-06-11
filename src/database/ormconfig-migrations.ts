import { MariadbDatabaseConfig } from './ormconfig';
import * as dotenvFlow from 'dotenv-flow';

dotenvFlow.config({ default_node_env: 'development' });

export default new MariadbDatabaseConfig().getSource();
