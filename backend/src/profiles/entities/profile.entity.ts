import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  name?: string;

  @OneToMany(() => User, (user) => user.profile)
  users?: User[];
}
