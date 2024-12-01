import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PostArticleDto } from '../dtos/post-article-params.dto';
import { UserService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePost {
	constructor(
		/**
			* Injecting users serivce
		  */
		private readonly usersService: UserService,

		@InjectRepository(Post)
		private articleOptionRepository: Repository<Post>,

		/**
		* Injecting users serivce
		*/
		private readonly tagsService: TagsService,

	) { }

	public async createArticle(postArticleDto: PostArticleDto, user: ActiveUserData) {
		let author = undefined;
		let tags = undefined;


		try {
			author = await this.usersService.findUserById(user.sub);

			tags = await this.tagsService.findMultipleTags(postArticleDto.tags)

		} catch (error) {
			throw new ConflictException(error)
		}

		if (postArticleDto.tags.length !== tags.length) {
			throw new BadRequestException('Please check your tags')
		}

		let createdArticle = this.articleOptionRepository.create({
			...postArticleDto,
			author,
			tags
		})

		try {
			return await this.articleOptionRepository.save(createdArticle)
		} catch (error) {
			throw new ConflictException(error, {
				description: 'avoid duplicates'
			})
		}

	}
}
