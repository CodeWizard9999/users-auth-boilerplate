import { config as dotenvConfig } from 'dotenv';
import * as process from 'node:process';
import { toNumber } from 'lodash';

dotenvConfig();

const databaseConfig = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: toNumber(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
};

export default databaseConfig;
