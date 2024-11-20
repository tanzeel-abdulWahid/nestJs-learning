import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {

    constructor(
        /**
         * inject users repository
         */
        @InjectRepository(User)
        private readonly usersRespository: Repository<User>,

        /**
         * Inject hashing provider
         */
        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
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
        let newUser = this.usersRespository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
        });

        try {
            newUser = await this.usersRespository.save(newUser)
        } catch (error) {
            throw new RequestTimeoutException('unable to proccess request', {
                description: 'Error connecting to the DB'
            })
        }

        return newUser
    }

}
