import { CreateUserDto } from './../dtos/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from './../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-params.dto';
import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindUserByEmailProvider } from './find-user-by-email.provider';

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

        private readonly usersCreateManyProvider: UsersCreateManyProvider,

        /**
         * inject create user provider
         */
        private readonly createUserProvider: CreateUserProvider,

        /**
         * inject find user by email user provider
         */
        private readonly findUserByEmailProvider: FindUserByEmailProvider
    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        return this.createUserProvider.createUser(createUserDto);
    }

    /**
     *get all users
     */
    public getUsers(getUsersParamDto: GetUsersParamDto) {
        // only return if authenticated

        // const isAuth = this.authService.isAuthenticated();
        // console.log(isAuth)

        // To get the env variable
        // const envVar = this.configService.get<string>("S3_BUCKET")
        // console.log("env var", envVar)

        console.log(this.profileconfiguration.profileApiKey)

        throw new HttpException({
            status: HttpStatus.MOVED_PERMANENTLY,
            error: 'this api endpoint doest not exists',
            fileName: 'users.service.ts',
            lineNumber: 79
        },
            HttpStatus.MOVED_PERMANENTLY,
            {
                cause: new Error(),
                description: 'api endpoint was removed'
            }
        )

        // return [{
        //     name: "tanzeel",
        //     age: 23
        // }, {
        //     name: "muskan",
        //     age: 15
        // }]
    }

    /**
     * 
     * @param id get user id
     * @returns particular user
     */
    public async findUserById(id: number) {
        let user = undefined;
        try {
            user = await this.usersRespository.findOneBy({
                id
            })
        } catch (error) {
            throw new RequestTimeoutException('unable to proccess request', {
                description: 'Error connecting to the DB'
            })
        }

        if (!user) {
            throw new BadRequestException('user does not exists')
        }

        return user
    }

    /**
     * create many users -- transactions example
     */
    public async createMany(createManyUsersDto: CreateManyUsersDto) {
        this.usersCreateManyProvider.createMany(createManyUsersDto);
    }

    public async findUserByEmail(email: string) {
        return await this.findUserByEmailProvider.findOneByEmail(email)
    }
}