import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class GetPostsParamsDto {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    userId?: number
}