import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
        private readonly dataSource: DataSource
    ) { }

    public async createMany(createManyUsersDto: CreateManyUsersDto) {
        let newUsers: User[] = [];

        // query runner instance
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            // connect query runner to datasource
            await queryRunner.connect();

            // start transaction
            await queryRunner.startTransaction();

        } catch (error) {
            throw new RequestTimeoutException("could not connect to the database")
        }

        try {
            for (let user of createManyUsersDto.users) {
                let newUser = queryRunner.manager.create(User, user);
                let result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }

            // commit the transaction
            await queryRunner.commitTransaction();
        } catch (error) {
            // in case of any error, rollback all changes
            await queryRunner.rollbackTransaction()

            throw new ConflictException('could not complete transaction', {
                description: String(error)
            })
        } finally {

            try {
                // finally close the query runnder instance
                await queryRunner.release();
            } catch (error) {
                throw new RequestTimeoutException("error releasing transaction", {
                    description: String(error)
                })
            }
        }

        return newUsers;
    }

}
