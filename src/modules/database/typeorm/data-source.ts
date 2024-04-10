import { DataSource } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';
import databaseConfig from 'src/config/database.config';

const dataSource = new DataSource({
  ...databaseConfig,
  type: 'postgres',
  entities,
  migrations,
  synchronize: true,
});

export default dataSource;
