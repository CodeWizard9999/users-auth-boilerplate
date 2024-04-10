import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'player_profile' })
export class PlayerProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date_of_registration: Date;

  @Column({ default: 0 })
  level: number;
}
