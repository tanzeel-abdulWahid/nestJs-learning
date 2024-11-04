import { CreateUserDto } from './../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { AuthService } from './../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-params.dto';
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';

/**
 * Class to connect users service with other services
 */
@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(User)
        private usersRespository: Repository<User>,
        private readonly configService: ConfigService,

        @Inject(profileConfig.KEY)
        private readonly profileconfiguration: ConfigType<typeof profileConfig>,

    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        const existingUser = await this.usersRespository.findOne({
            where: { email: createUserDto.email }
        })
        //TODO Handle Exception 

        // Create new user
        let newUser = this.usersRespository.create(createUserDto);
        newUser = await this.usersRespository.save(newUser)

        return newUser
    }

    /**
     *get all users
     */
    public getUsers(getUsersParamDto: GetUsersParamDto) {
        // only return if authenticated

        const isAuth = this.authService.isAuthenticated();
        // console.log(isAuth)

        // To get the env variable
        // const envVar = this.configService.get<string>("S3_BUCKET")
        // console.log("env var", envVar)

        console.log(this.profileconfiguration.profileApiKey)
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
    public async findUserById(id: number) {
        return await this.usersRespository.findOneBy({
            id
        })
    }
}