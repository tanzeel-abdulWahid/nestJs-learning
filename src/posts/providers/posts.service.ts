import { EditArticleDto } from './../dtos/patch-article-params.dto';
import { PostArticleDto } from './../dtos/post-article-params.dto';
import { Body, Injectable } from '@nestjs/common';
import { GetPostsParamsDto } from '../dtos/get-posts-params.dto';
import { UserService } from 'src/users/providers/users.service';
import { In, Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';

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

        /**
               * Injecting users serivce
              */
        private readonly tagsService: TagsService,
    ) { }


    public async createArticle(postArticleDto: PostArticleDto) {

        // let metaOpt = postArticleDto.metaOption ? this.metaOptionRepository.create(postArticleDto.metaOption) : null;

        // if (metaOpt) {
        //     await this.metaOptionRepository.save(metaOpt);
        // }
        let author = await this.usersService.findUserById(postArticleDto.authorId);

        let tags = await this.tagsService.findMultipleTags(postArticleDto.tags)

        let createdArticle = this.articleOptionRepository.create({
            ...postArticleDto,
            author,
            tags
        })

        // if (metaOpt) {
        //     createdArticle.metaOption = metaOpt
        // }

        // WE'LL DO USING CASCASEs

        return await this.articleOptionRepository.save(createdArticle)
    }

    public async update(editArticleDto: EditArticleDto) {
        let post = await this.articleOptionRepository.findOneBy({ id: editArticleDto.id });

        let tags = await this.tagsService.findMultipleTags(editArticleDto.tags)

        // Update post related properties
        post.title = editArticleDto.title ?? post.title;
        post.content = editArticleDto.content ?? post.content;
        post.status = editArticleDto.status ?? post.status;
        post.postType = editArticleDto.postType ?? post.postType;
        post.slug = editArticleDto.slug ?? post.slug;
        post.featuredImageUrl =
            editArticleDto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishedOn = editArticleDto.publishedOn ?? post.publishedOn;

        post.tags = tags;

        return await this.articleOptionRepository.save(post);
    }

    public async getPosts(getPostsDto: GetPostsParamsDto) {
        const user = this.usersService.findUserById(getPostsDto.userId);
        // use users service,

        return this.articleOptionRepository.find({
            relations: {
                metaOption: true,
                author: true, //RECOMMENDED-- OR we can use eager:true in posts entity
                tags: true
            }
        });
    }

    public async deletePost(id: number) {
        // const post = await this.articleOptionRepository.findOneBy({
        //     id
        // });

        await this.articleOptionRepository.delete(id)

        // // delete the metaOption    
        // await this.metaOptionRepository.delete(post.metaOption.id)

        //  //!by setting it to bidirection, we can even get post from meta ooption
        // let inversePost = await this.metaOptionRepository.find({
        //     where: { id: post.metaOption.id },
        //     relations: {
        //         post: true
        //     }
        // })

        // console.log(inversePost)

        return { deleted: true, id }

    }
}
