import * as dotenvFlow from 'dotenv-flow';

// Must be first instruction to work, even before imports
dotenvFlow.config({ default_node_env: 'development' });

import ormConfig from './ormconfig';

export default ormConfig.getSource();
