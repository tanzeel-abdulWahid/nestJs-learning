import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator"
import { PostType } from "../enums/PostType.enum"
import { PostStatus } from "../enums/PostStatus.enum";
import { CreateArticleMetaOptionsDto } from "../../meta-options/dtos/create-article-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PostArticleDto {
    @ApiProperty({ example: "New Post Title", description: "Title for article" }) //for swagger required property
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'my-blog-post', description: "for example 'my blog post' " })
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    slug: string;

    @ApiProperty({ enum: PostType, description: 'Values can be post,page,story,series' })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @ApiProperty({
        enum: PostStatus,
        example: "draft",
        description: "Possible values 'draft', 'scheduled', 'review', 'published'",
    })
    @IsEnum(PostStatus)
    status: PostStatus;

    @ApiPropertyOptional({
        description: "this is the content of the post",
        example: "Tanzeels company earned 8 billion dollars in 2031"
    })
    @IsOptional()
    @IsString()
    content?: string;


    @ApiPropertyOptional({
        description:
            'Serialize your JSON object else a validation error will be thrown',
        example: "{\r\n    \"@context\": \"https:\/\/schema.org\",\r\n    \"@type\": \"Person\"\r\n  }"
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        example: 'https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbmluZ3xlbnwwfHwwfHx8MA%3D%3D',
        description: 'featured image for the blog post'
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;


    @ApiPropertyOptional({
        description: 'Must be a valid timestamp in ISO8601',
        example: '2024-03-16T07:46:32+0000',
    })
    @IsOptional()
    @IsISO8601()
    publishedOn?: Date;

    @ApiPropertyOptional({
        description: 'array of tags',
        example: ["nestjs", "typescript"]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true }) //check for each value of the array is string
    @MinLength(3, { each: true })
    tags?: string[];

    @ApiPropertyOptional({
        type: 'object',
        required: false,
        items: {
            type: 'object',
            properties: {
                metaValue: {
                    type: 'json',
                    description: 'The metaValue is a JSON string ',
                    example: '{"sidebarEnabled":true}',
                }
            }
        }

    })
    @IsOptional()
    // Both lines are must for nested DTO
    @ValidateNested({ each: true })  //it ensures all above validations are conducrted
    @Type(() => CreateArticleMetaOptionsDto) // helps nest understand type of nested obj
    metaOption?: CreateArticleMetaOptionsDto | null;


}