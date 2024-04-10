import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin_profile' })
export class AdminProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date_of_birth: Date;

  @Column()
  contact_number: string;
}
