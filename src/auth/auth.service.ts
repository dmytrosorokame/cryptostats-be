import { UserResponse } from './../users/dto/user-response.dto';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface ITokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserResponse, response: Response): Promise<void> {
    const tokenPayload: ITokenPayload = { userId: user._id };

    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() +
        +this.configService.get<string>('JWT_EXPIRATION_TIME'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, { httpOnly: true, expires });
  }
}
