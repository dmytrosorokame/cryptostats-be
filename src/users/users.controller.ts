import { UserResponse } from './dto/user-response.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto';
import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUser() user: UserResponse): UserResponse {
    return user;
  }
}
