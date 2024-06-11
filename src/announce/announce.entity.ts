import { Level } from 'src/level/level.entity';
import { Subject } from 'src/subject/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
}
