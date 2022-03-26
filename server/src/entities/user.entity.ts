import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Word } from './word.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  hashedPassword: string;

  @Column()
  hashedRefreshToken: string;

  @ManyToOne(() => Word)
  words: Word[];
}
