import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { User } from './user.entity';

@Entity({ name: 'words' })
export class Word {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.words)
  user: User;
}
