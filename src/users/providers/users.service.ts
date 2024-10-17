import { AuthService } from './../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-params.dto';
import { forwardRef, Inject, Injectable } from "@nestjs/common";

/**
 * Class to connect users service with other services
 */
@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { }
    /**
     *get all users
     */
    public getUsers(getUsersParamDto: GetUsersParamDto) {
        // only return if authenticated

        const isAuth = this.authService.isAuthenticated();
        console.log(isAuth)

        return [{
            name: "tanzeel",
            age: 23
        }, {
            name: "muskan",
            age: 15
        }]
    }

    /**
     * 
     * @param id get user id
     * @returns particular user
     */
    public findUserById(id: number) {
        return {
            id: 2,
            fname: "tanzeel",
            email: "test@gmail.com"
        }
    }
}