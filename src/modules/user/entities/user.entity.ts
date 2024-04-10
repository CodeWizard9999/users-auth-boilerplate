import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGender, UserRole } from '../types/enum';
import { PlayerProfileEntity } from './player_profile.entity';
import { AdminProfileEntity } from './admin_profile.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  avatar_link: string;

  @Column({ enum: UserGender })
  gender: UserGender;

  @OneToOne(() => PlayerProfileEntity)
  @JoinColumn({ name: 'player_profile_id' })
  player_profile: PlayerProfileEntity;

  @Column({ nullable: true })
  player_profile_id: string;

  @OneToOne(() => AdminProfileEntity)
  @JoinColumn({ name: 'admin_profile_id' })
  admin_profile: AdminProfileEntity;

  @Column({ nullable: true })
  admin_profile_id: string;
}
