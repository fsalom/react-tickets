import { Token } from './Token';

export class Tokens {
    accessToken: Token;
    refreshToken: Token;

    constructor(accessToken: Token, refreshToken: Token) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    get isAccessTokenValid(): boolean {
        return this.accessToken.isValid;
    }

    get isRefreshTokenValid(): boolean {
        return this.refreshToken.isValid;
    }
}