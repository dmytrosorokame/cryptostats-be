import { UsersRepository } from './users.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, UserResponse } from './dto';
import { hash, compare } from 'bcrypt';
import { User } from './models/User';
import { CoinbaseAuth } from './models/CoinbaseAuth';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  private prepareResponse(user: User): UserResponse {
    return {
      _id: user._id.toHexString(),
      email: user.email,
      isCoinbaseAuthorize: !!user.coinbaseAuth,
    };
  }

  private async validateCreateUser(dto: CreateUserDto): Promise<void> {
    const user = await this.usersRepo.findOneByEmail(dto.email);

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

  async updateUser(userId: string, data: Partial<User>): Promise<UserResponse> {
    const user = await this.usersRepo.updateOne(userId, data);

    if (!user) {
      throw new NotFoundException(`user not found by _id: ${userId}.`);
    }

    return this.prepareResponse(user);
  }

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.usersRepo.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`not found user with email: ${email}`);
    }

    const passwordIsValid = await compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('credentials are invalid');
    }

    return this.prepareResponse(user);
  }

  async getUserById(id: string): Promise<UserResponse> {
    const user = await this.usersRepo.findOneById(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.prepareResponse(user);
  }

  async getCoinbaseAuth(userId: string): Promise<CoinbaseAuth> {
    const user = await this.usersRepo.findOneById(userId);

    if (!user) {
      throw new NotFoundException(`not found user with _id: ${userId}`);
    }

    if (!user.coinbaseAuth) {
      throw new UnauthorizedException(
        `user with _id: ${userId} has not authorized Coinbase.`,
      );
    }

    return user.coinbaseAuth;
  }
}
