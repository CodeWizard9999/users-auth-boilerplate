import { UserGender, UserRole } from './enum';

interface CreateUserData {
  avatar_link: string;
  password: string;
  username: string;
  gender: UserGender;
  role: UserRole;
}

export type CreateAdminData = CreateUserData & { player_profile_id: string };

export type CreatePlayerData = CreateUserData & { admin_profile_id: string };
