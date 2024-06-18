import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  public async signUpUser(@Body() body: CreateUserDTO) {
    return await this.userService.signUpUser(body);
  }
}
