import { DataSource, Repository } from 'typeorm';
import { TokenBlackListEntity } from './enteties/token_black_list.entity';

export const authProviders = [
  {
    provide: 'TOKEN_BLACK_LIST_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<TokenBlackListEntity> =>
      dataSource.getRepository(TokenBlackListEntity),
    inject: ['DATA_SOURCE'],
  },
];
