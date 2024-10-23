import { CreateArticleMetaOptionsDto } from './../dtos/create-article-meta-options.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOption)
        private metaOptionRepository: Repository<MetaOption>
    ) { }

    // create the meta option
    public async createMetaOption(createArticleMetaOptionsDto: CreateArticleMetaOptionsDto) {
        const metaOpt = this.metaOptionRepository.create(createArticleMetaOptionsDto);

        return await this.metaOptionRepository.save(metaOpt);

    }
}
