import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from "express"
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {

    constructor(

        @Inject(REQUEST)
        private readonly request: Request
    ) { }

    public async paginateQuery<T extends ObjectLiteral>(paginationQueryDto: PaginationQueryDto, respository: Repository<T>): Promise<Paginated<T>> {

        let results = await respository.find({
            skip: (paginationQueryDto.page - 1) * paginationQueryDto.limit,
            take: paginationQueryDto.limit,
        });

        const baseUrl = this.request.protocol + "://" + this.request.headers.host + "/"
        // console.log(baseUrl) //http://localhost:3000/
        const newUrl = new URL(this.request.url, baseUrl)
        // console.log(newUrl)

        const totalItems = await respository.count();
        const totalPages = Math.ceil(totalItems / paginationQueryDto.limit);
        const nextPage = totalPages == paginationQueryDto.page ? paginationQueryDto.page : paginationQueryDto.page + 1
        const prevPage = paginationQueryDto.page == 1 ? paginationQueryDto.page : paginationQueryDto.page - 1

        const finalResponse: Paginated<T> = {
            items: results,
            meta: {
                currentPage: paginationQueryDto.page,
                itemsPerPage: paginationQueryDto.limit,
                totalItems,
                totalPages,
            },
            links: {
                firstPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
                lastPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
                currentPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${paginationQueryDto.page}`,
                nextPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
                previousPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${prevPage}`,
            }
        }

        return finalResponse
    }

}
