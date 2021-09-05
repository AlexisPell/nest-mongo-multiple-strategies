import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Get, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get('single')
  getUserByEmail(@Body() body: Pick<CreateUserDto, 'email'>) {
    return this.usersService.getUserByEmail(body.email);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}
