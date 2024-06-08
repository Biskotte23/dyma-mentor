import { LevelEntity } from 'src/level/entities/level.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LevelEntity, (level) => level.subjects)
  @JoinColumn()
  level?: LevelEntity;
}
