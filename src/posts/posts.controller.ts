import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPostsParamsDto } from './dtos/get-posts-params.dto';
import { PostsSerivce } from './providers/posts.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { PostArticleDto } from './dtos/post-article-params.dto';
import { EditArticleDto } from './dtos/patch-article-params.dto';

@Controller('posts')
@ApiTags("Posts")
export class PostsController {
    constructor(private readonly postsSerivce: PostsSerivce) { }

    @Get('/:userId?')
    public getPosts(@Param() getPostsDto: GetPostsParamsDto) {
        return this.postsSerivce.getPosts(getPostsDto)
    }

    @ApiOperation({
        summary: "creates a new article post"
    })
    @ApiResponse({
        status: 201,
        description: "post created successfully"
    })
    @Post()
    public postArticle(@Body() postArticleDto: PostArticleDto) {
        return this.postsSerivce.createArticle(postArticleDto)
    }

    @Delete()
    public deletePost(@Query('id', ParseIntPipe) id: number) {
        return this.postsSerivce.deletePost(id);
    }


    @ApiOperation({ summary: "To edit any article by providing its id" })
    @ApiResponse({})
    @Patch()
    public editArticle(@Body() editArticleDto: EditArticleDto) {
        console.log(editArticleDto)
    }
}
