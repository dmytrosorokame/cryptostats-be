import { CoinbaseController } from './coinbase.controller';
import { Module } from '@nestjs/common';
import { CoinbaseAuthService } from './coinbase-auth.service';

@Module({
  controllers: [CoinbaseController],
  providers: [CoinbaseAuthService],
})
export class CoinbaseModule {}
