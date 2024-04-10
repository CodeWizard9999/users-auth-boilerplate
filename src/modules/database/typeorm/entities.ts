import { UserEntity } from 'src/modules/user/entities/user.entity';
import { PlayerProfileEntity } from 'src/modules/user/entities/player_profile.entity';
import { AdminProfileEntity } from 'src/modules/user/entities/admin_profile.entity';
import { TokenBlackListEntity } from '../../auth/enteties/token_black_list.entity';

export const entities = [
  UserEntity,
  PlayerProfileEntity,
  AdminProfileEntity,
  TokenBlackListEntity,
];
