import { PostArticleDto } from './../dtos/post-article-params.dto';
import { Body, Injectable } from '@nestjs/common';
import { GetPostsParamsDto } from '../dtos/get-posts-params.dto';
import { UserService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';

@Injectable()
export class PostsSerivce {
    constructor(
        /**
         * Injecting users serivce
        */
        private readonly usersService: UserService,
        /**
         * metaoptions reposistory
        */
        @InjectRepository(MetaOption)
        private metaOptionRepository: Repository<MetaOption>,

        @InjectRepository(Post)
        private articleOptionRepository: Repository<Post>,


    ) { }


    public async createArticle(postArticleDto: PostArticleDto) {
        let metaOpt = postArticleDto.metaOption ? this.metaOptionRepository.create(postArticleDto.metaOption) : null;

        if (metaOpt) {
            await this.metaOptionRepository.save(metaOpt);
        }

        let createdArticle = this.articleOptionRepository.create(postArticleDto)

        if (metaOpt) {
            createdArticle.metaOption = metaOpt
        }

        return await this.articleOptionRepository.save(createdArticle)


    }

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
