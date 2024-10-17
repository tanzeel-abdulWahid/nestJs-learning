import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsSerivce } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    controllers: [PostsController],
    providers: [PostsSerivce],
    imports: [UsersModule] // to use users service in posts module -- WE import whole user module
})
export class PostsModule { }
