import { IsJSON, IsNotEmpty } from "class-validator";

export class CreateArticleMetaOptionsDto {
    @IsNotEmpty()
    @IsJSON()
    metaValue: string;
}