export type Subject = {
  id: number;
  name: string;
};

export type NewSubject = {
  name: string;
};

export interface SubjectWithLevel {
  subject: Subject;
  level: Level;
}
