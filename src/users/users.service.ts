import { UsersRepository } from './users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponse } from './dto';
import { hash } from 'bcrypt';
import { User } from './models/User';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  private prepareResponse(user: User): UserResponse {
    return { _id: user._id.toHexString(), email: user.email };
  }

  private async validateCreateUser(dto: CreateUserDto): Promise<void> {
    const user = this.usersRepo.findOneByEmail(dto.email);

    if (user) {
      throw new BadRequestException('user already exists');
    }
  }

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    await this.validateCreateUser(dto);

    const hashedPassword = await hash(dto.password, 10);

    const user = await this.usersRepo.insertOne({
      ...dto,
      password: hashedPassword,
    });

    return this.prepareResponse(user);
  }
}
