import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindUserByEmailProvider {
    constructor(
        /**
         * Inject users Repository
         */
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }

    public async findOneByEmail(email: string) {
        let user: User | undefined = undefined;

        try {
            user = await this.usersRepository.findOneBy({
                email
            })
            if (!user) {
                throw new NotFoundException("User does not exists")
            }

            return user
        } catch (error) {
            throw new RequestTimeoutException(error, {
                description: "Request timeout, please try again later"
            })
        }
    }
}
