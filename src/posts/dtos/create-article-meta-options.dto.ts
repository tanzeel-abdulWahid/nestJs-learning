import { IsNotEmpty, IsString } from "class-validator";

export class CreateArticleMetaOptionsDto {
    @IsString()
    @IsNotEmpty()
    key: string;

    @IsNotEmpty()
    value: any
}