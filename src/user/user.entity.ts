import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './interfaces/role';
import { Course } from 'src/course/course.entity';
import { Announce } from 'src/announce/announce.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    enum: Role,
    default: Role.Admin,
  })
  role: Role;

  @OneToMany(() => Course, (course) => course.announce)
  @JoinColumn()
  courses: Course[];

  @OneToMany(() => Announce, (announce) => announce.teacher)
  @JoinColumn()
  announces: Announce[];
}
