import { SignInProvider } from './sign-in.provider';
import { UserService } from 'src/users/providers/users.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService,

        /**
         * Inject signin provider
         */
        private readonly signInProvider: SignInProvider
    ) { }

    public async signIn(signInDto: SignInDto) {
        // const user = this.usersService.findUserById(2);
        // return "token"

        return await this.signInProvider.signIn(signInDto);
    }

    public isAuthenticated() {
        return true
    }
}
