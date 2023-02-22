import { AuthModule } from './../auth.module';
import { UsersModule } from './../../users/users.module';
import { CoinbaseController } from './coinbase.controller';
import { Module } from '@nestjs/common';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, UsersModule, AuthModule],
  controllers: [CoinbaseController],
  providers: [CoinbaseAuthService],
})
export class CoinbaseModule {}
