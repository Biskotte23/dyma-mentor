import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './interfaces/role';

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
}
