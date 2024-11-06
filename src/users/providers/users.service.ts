import { CreateUserDto } from './../dtos/create-user.dto';
import { DataSource, Repository } from 'typeorm';
import { AuthService } from './../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-params.dto';
import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from "@nestjs/common";
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

        private readonly dataSource: DataSource
    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        let existingUser = undefined;

        try {
            existingUser = await this.usersRespository.findOne({
                where: { email: createUserDto.email }
            })
        } catch (error) {
            throw new RequestTimeoutException('unable to proccess request', {
                description: 'Error connecting to the DB'
            })
        }

        if (existingUser) {
            throw new BadRequestException('User already exists', {
                description: 'try another email'
            })
        }
        // Create new user
        let newUser = this.usersRespository.create(createUserDto);

        try {
            newUser = await this.usersRespository.save(newUser)
        } catch (error) {
            throw new RequestTimeoutException('unable to proccess request', {
                description: 'Error connecting to the DB'
            })
        }

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
    public async createMany(createUserDto: CreateUserDto[]) {
        let newUsers: User[] = [];

        // query runner instance
        const queryRunner = this.dataSource.createQueryRunner();

        // connect query runner to datasource
        await queryRunner.connect();

        // start transaction
        await queryRunner.startTransaction();

        try {
            for (let user of createUserDto) {
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }

            // commit the transaction
            await queryRunner.commitTransaction();
        } catch (error) {
            // in case of any error, rollback all changes
            await queryRunner.rollbackTransaction()
        } finally {
            // finally close the query runnder instance
            await queryRunner.release();
        }

        return newUsers;
    }

}