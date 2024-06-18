import { Announce } from 'src/announce/announce.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name2: string;

  @OneToMany(() => Announce, (announce) => announce.subject)
  announces: Announce[];
}
