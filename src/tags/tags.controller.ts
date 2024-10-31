import { Body, Controller, Delete, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TagsService } from './providers/tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }


    @ApiOperation({
        summary: "creates a new tags array"
    })
    @ApiResponse({
        status: 201,
        description: "tags created successfully"
    })
    @Post("/create")
    public createTags(@Body() tagsData: CreateTagDto) {
        return this.tagsService.createTags(tagsData);
    }

    @Delete("/delete")
    public deleteTag(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.delete(id)
    }

    @Delete("/delete/soft-delete")
    public softDeleteTag(@Query('id', ParseIntPipe) id: number) {
        return this.tagsService.softdelete(id)
    }
}
