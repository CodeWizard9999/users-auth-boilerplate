import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'token_black_list' })
export class TokenBlackListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;
}
