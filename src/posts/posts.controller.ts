import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostsParamsDto } from './dtos/get-posts-params.dto';
import { PostsSerivce } from './providers/posts.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, Req } from '@nestjs/common';
import { PostArticleDto } from './dtos/post-article-params.dto';
import { EditArticleDto } from './dtos/patch-article-params.dto';
import { GetPostsQueryDto } from './dtos/get-posts-query.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags("Posts")
export class PostsController {
    constructor(private readonly postsSerivce: PostsSerivce) { }

    @Get('/:userId?')
    public getPosts(@Param() getPostsDto: GetPostsParamsDto, @Query() postQuery: GetPostsQueryDto) {
        // console.log(postQuery)
        return this.postsSerivce.getPosts(postQuery, getPostsDto)
    }

    @ApiOperation({
        summary: "creates a new article post"
    })
    @ApiResponse({
        status: 201,
        description: "post created successfully"
    })
    @Post()
    public postArticle(@Body() postArticleDto: PostArticleDto, @ActiveUser() user: ActiveUserData) {
        return this.postsSerivce.createArticle(postArticleDto, user)
    }

    @Delete()
    public deletePost(@Query('id', ParseIntPipe) id: number) {
        return this.postsSerivce.deletePost(id);
    }


    @ApiOperation({ summary: "To edit any article by providing its id" })
    @ApiResponse({})
    @Patch()
    public editArticle(@Body() editArticleDto: EditArticleDto) {
        return this.postsSerivce.update(editArticleDto);
    }
}
