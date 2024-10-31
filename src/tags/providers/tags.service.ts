import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private tagsRepository: Repository<Tag>,
    ) { }

    public async createTags(tagsDto: CreateTagDto) {
        let tags = this.tagsRepository.create(tagsDto);

        return await this.tagsRepository.save(tags);
    }

    public async findMultipleTags(tags: number[]) {
        let results = this.tagsRepository.find({
            where: {
                id: In(tags)
            }
        })

        return results
    }

    public async delete(id: number) {
        await this.tagsRepository.delete(id);

        return { deleted: true, id }
    }

    public async softdelete(id: number) {
        await this.tagsRepository.softDelete(id);

        return { deleted: true, id }
    }
}
