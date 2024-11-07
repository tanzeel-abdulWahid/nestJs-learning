import { IsPositive } from 'class-validator';
import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit?: number = 10 //default value

    @IsOptional()
    @IsPositive()
    page?: number = 1
}