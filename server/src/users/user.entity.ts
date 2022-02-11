import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Word } from './user-words.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  login: string;

  @Column({})
  password: string;

  @Column({
    default:
      'https://media.wired.com/photos/593261cab8eb31692072f129/master/w_120',
  })
  imgURL: string;

  @OneToMany(() => Word, (word: Word) => word.user)
  words: Word[];
}
