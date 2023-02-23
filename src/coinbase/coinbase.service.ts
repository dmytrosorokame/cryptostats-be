import { lastValueFrom } from 'rxjs';
import { CoinbaseAuthService } from './coinbase-auth.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoinbaseService {
  constructor(
    private httpService: HttpService,
    private coinbaseAuthService: CoinbaseAuthService,
  ) {}

  async getPrimaryAccountTransactions(userId: string): Promise<any> {
    const primaryAccount = await this.getPrimaryAccount(userId);

    return this.getAccountTransactions(primaryAccount.id, userId);
  }

  private async getPrimaryAccount(userId: string): Promise<any> {
    try {
      const response$ = this.httpService.get(
        'https://api.coinbase.com/v2/accounts',
        {
          headers: await this.getHeaders(userId),
        },
      );

      const response = await lastValueFrom(response$);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  private async getAccountTransactions(accountId: string, userId: string) {
    try {
      const response$ = this.httpService.get(
        `https://api.coinbase.com/v2/accounts/${accountId}/transactions`,
        {
          headers: await this.getHeaders(userId),
        },
      );

      const response = await lastValueFrom(response$);

      return response.data.data.find((account) => account.primary);
    } catch (error) {
      throw error.response.data;
    }
  }

  private async getHeaders(userId: string) {
    return {
      Authorization: `Bearer ${this.coinbaseAuthService.getAccessToken(
        userId,
      )}`,
    };
  }
}
