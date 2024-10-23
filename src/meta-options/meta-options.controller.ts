import { CreateArticleMetaOptionsDto } from './dtos/create-article-meta-options.dto';
import { MetaOptionsService } from './providers/meta-options.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(private readonly metaOptionsService: MetaOptionsService) { }

    @Post()
    public createMeta(@Body() createArticleMetaOptionsDto: CreateArticleMetaOptionsDto) {
        return this.metaOptionsService.createMetaOption(createArticleMetaOptionsDto);
    }
}
