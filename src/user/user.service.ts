import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  public async findOne(email: string): Promise<User> {
    return await this.repository.findOneBy({ email });
  }

  public async signUpUser({
    firstName,
    lastName,
    email,
    password,
    role,
  }: CreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 10);

    return await this.repository.save({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
    });
  }
}
