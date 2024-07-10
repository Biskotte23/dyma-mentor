import { Course } from 'src/course/course.entity';
import { Level } from 'src/level/level.entity';
import { Subject } from 'src/subject/subject.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Announce {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => Subject, (subject) => subject.announces)
  @JoinColumn()
  subject: Subject;

  @ManyToOne(() => Level, (level) => level.announces)
  @JoinColumn()
  level: Level;

  @OneToMany(() => Course, (course) => course.announce)
  @JoinColumn()
  courses: Course[];

  @ManyToOne(() => User, (user) => user.announces)
  @JoinColumn()
  teacher: User;
}
