import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { PostArticleDto } from "./post-article-params.dto";

export class EditArticleDto extends PartialType(PostArticleDto) {
    @ApiProperty({ description: "id of the post to edit", example: 69 })
    @IsInt()
    @IsNotEmpty()
    id: number
}