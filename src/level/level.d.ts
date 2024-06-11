import { Subject } from 'src/subject/subject';

export type Level = {
  id: number;
  name: string;
};

export interface LevelWithSubjects {
  level: Level;
  subjects: Subject[];
}
