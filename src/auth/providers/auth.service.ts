import { UserService } from 'src/users/providers/users.service';
import { Injectable, Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly usersService: UserService
    ) { }
    public login(email: string, password: string, id: number) {
        const user = this.usersService.findUserById(2);

        return "token"
    }

    public isAuthenticated() {
        return true
    }
}
