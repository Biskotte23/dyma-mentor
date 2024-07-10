import { Announce } from 'src/announce/announce.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn()
  student: User;

  @ManyToOne(() => Announce, (announce) => announce.courses)
  @JoinColumn()
  announce: Announce;

  @Column()
  date: Date;

  @Column()
  hours: number;
}
