import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { Role } from './interfaces/role';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  public async signUpUser(@Body() body: CreateUserDTO) {
    return await this.userService.signUpUser(body);
  }

  @Get('/me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  public async getUserInfo(@Req() { user }): Promise<User> {
    return this.userService.findOne(user.username);
  }
}
