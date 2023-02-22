import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class CoinbaseAuthService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  public authorize(res: Response): void {
    res.redirect(this.buildAuthorizeUrl().href);
    return;
  }

  private buildAuthorizeUrl() {
    const authorizeUrl = new URL('https://coinbase.com/oauth/authorize');

    authorizeUrl.searchParams.append('response_type', 'code');
    authorizeUrl.searchParams.append(
      'client_id',
      this.configService.get<string>('COINBASE_CLIENT_ID'),
    );
    authorizeUrl.searchParams.append(
      'redirect_uri',
      this.configService.get<string>('COINBASE_REDIRECT_URI'),
    );
    authorizeUrl.searchParams.append(
      'scope',
      'wallet:transactions:read,wallet:accounts:read',
    );

    return authorizeUrl;
  }

  public handleCallback(req: Request, res: Response): void {
    const { code } = req.query;
    const { user } = req;

    this.getTokensFromCode(code as string).subscribe(
      async (tokensResponse) => {},
    );
  }

  private getTokensFromCode(code: string) {
    return this.httpService.post('http://api.coinbase.com/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: this.configService.get<string>('COINBASE_CLIENT_ID'),
      client_secret: this.configService.get<string>('COINBASE_CLIENT_SECRET'),
      redirect_uri: this.configService.get<string>('COINBASE_REDIRECT_URI'),
    });
  }
}
