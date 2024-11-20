import { SignInDto } from './../dtos/signin.dto';
import { UserService } from 'src/users/providers/users.service';
import { forwardRef, Inject, Injectable, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

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
         * injecting jwt service
         */
        private readonly jwtService: JwtService,
        /**
         * injecting jwt config
         */
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

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

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        }, {
            audience: this.jwtConfiguration.audience,
            issuer: this.jwtConfiguration.issuer,
            secret: this.jwtConfiguration.secret,
            expiresIn: this.jwtConfiguration.accesTokenTtl
        })

        return { accessToken }
    }
}
