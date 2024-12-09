import { SignInDto } from './../dtos/signin.dto';
import { UserService } from 'src/users/providers/users.service';
import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
    constructor(
        /**
         * Inject users service
         */
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,

        /**
         * inject hashing provider
         */
        private readonly hashingProvider: HashingProvider,

        /**
        * injecting generateTokensProvider service
        */
        private readonly generateTokensProvider: GenerateTokensProvider,

    ) { }

    public async signIn(signInDto: SignInDto) {
        let user = await this.userService.findUserByEmail(signInDto.email);

        let isEqual: boolean = false;

        try {
            isEqual = await this.hashingProvider.comparePassword(signInDto.password, user.password)
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: "request timeout, please try again later"
            })
        }

        if (!isEqual) {
            throw new UnauthorizedException('Incorrect Password')
        }
        return await this.generateTokensProvider.generateTokens(user);
    }
}
