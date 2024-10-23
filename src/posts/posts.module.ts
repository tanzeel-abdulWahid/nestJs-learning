import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsSerivce } from './providers/posts.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';

@Module({
    controllers: [PostsController],
    providers: [PostsSerivce],
    imports: [
        UsersModule,
        TypeOrmModule.forFeature(([Post, MetaOption])),
        MetaOptionsModule

    ] // to use users service in posts module -- WE import whole user module
})
export class PostsModule { }
