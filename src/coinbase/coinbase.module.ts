import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { CoinbaseController } from './coinbase.controller';
import { Module } from '@nestjs/common';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { HttpModule } from '@nestjs/axios';
import { CoinbaseService } from './coinbase.service';

@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [CoinbaseController],
  providers: [CoinbaseAuthService, CoinbaseService],
})
export class CoinbaseModule {}
