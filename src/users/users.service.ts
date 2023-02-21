import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async createUser(dto: CreateUserDto) {
    return this.usersRepo.insertOne(dto);
  }
}
