import { CoinbaseController } from './coinbase.controller';
import { Module } from '@nestjs/common';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { HttpModule } from '@nestjs/axios';
import { EncryptionService } from '../encryption.service';

@Module({
  imports: [HttpModule, EncryptionService],
  controllers: [CoinbaseController],
  providers: [CoinbaseAuthService],
})
export class CoinbaseModule {}
