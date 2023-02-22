import { CoinbaseAuthService } from './coinbase-auth.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('coinbase')
export class CoinbaseController {
  constructor(private coinbaseAuthService: CoinbaseAuthService) {}

  @Get('auth')
  @UseGuards(JwtAuthGuard)
  authorize(@Res() response: Response): void {
    this.coinbaseAuthService.authorize(response);
  }

  @Get('auth/callback')
  @UseGuards(JwtAuthGuard)
  handleCallback(@Req() request: Request, @Res() response: Response): void {}
}
