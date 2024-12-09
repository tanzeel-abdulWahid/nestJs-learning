import { RefreshTokenDto } from './../dtos/refresh-token.dto';
import { SignInProvider } from './sign-in.provider';
import { UserService } from 'src/users/providers/users.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        /**
         * Inject signin provider
         */
        private readonly signInProvider: SignInProvider,
        /**
         * inject refresh Tokens provider
         */
        private readonly refreshTokensProvider: RefreshTokensProvider
    ) { }

    public async signIn(signInDto: SignInDto) {
        // const user = this.usersService.findUserById(2);
        // return "token"

        return await this.signInProvider.signIn(signInDto);
    }

    public async refreshToken(refreshTokenDto: RefreshTokenDto) {
        return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
    }
}
