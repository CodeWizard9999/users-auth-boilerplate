import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AdminProfileEntity } from './entities/admin_profile.entity';
import { PlayerProfileEntity } from './entities/player_profile.entity';

interface UserRepositoryCustomMethods {
  getUserByUsername: (username: string) => Promise<UserEntity>;
  getUserById: (id: string) => Promise<UserEntity>;
}

export type UserRepository = Repository<UserEntity> &
  UserRepositoryCustomMethods;

const relations = ['admin_profile', 'player_profile'];

const userRepositoryCustomMethods: UserRepositoryCustomMethods = {
  getUserByUsername(username: string): Promise<UserEntity> {
    return this.findOne({
      where: { username },
      relations,
    });
  },
  getUserById(id: string): Promise<UserEntity> {
    return this.findOne({
      where: { id },
      relations,
    });
  },
};

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource): UserRepository =>
      dataSource.getRepository(UserEntity).extend(userRepositoryCustomMethods),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADMIN_PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<AdminProfileEntity> =>
      dataSource.getRepository(AdminProfileEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PLAYER_PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<PlayerProfileEntity> =>
      dataSource.getRepository(PlayerProfileEntity),
    inject: ['DATA_SOURCE'],
  },
];
