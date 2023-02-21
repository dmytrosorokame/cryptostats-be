import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/User';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async insertOne(data: Partial<User>): Promise<User> {
    const user = new this.user(data);

    return user.save();
  }
}
