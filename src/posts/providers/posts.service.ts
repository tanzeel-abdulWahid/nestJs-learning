import { Injectable } from '@nestjs/common';
import { GetPostsParamsDto } from '../dtos/get-posts-params.dto';
import { UserService } from 'src/users/providers/users.service';

@Injectable()
export class PostsSerivce {
    constructor(
        /*
        Injecting users serivce
        */
        private readonly usersService: UserService
    ) { }
    public getPosts(getPostsDto: GetPostsParamsDto) {
        console.log(getPostsDto)
        const user = this.usersService.findUserById(getPostsDto.userId);
        // use users service,
        // if user exists, find a post
        return [
            {
                user,
                title: "tanzeel",
                age: 23
            },
            {
                user,
                title: "yusra shah",
                age: 20
            },

        ]
    }
}
