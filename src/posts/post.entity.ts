import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/PostType.enum";
import { PostStatus } from "./enums/PostStatus.enum";
import { CreateArticleMetaOptionsDto } from "../meta-options/dtos/create-article-meta-options.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false
    })
    title: string;

    @Column({
        type: 'enum',
        enum: PostType,
        default: PostType.POST,
        nullable: false
    })
    postType: PostType;

    @Column({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.PUBLISHED,
        nullable: false
    })
    status: PostStatus;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique: true
    })
    slug: string;

    @Column({
        type: 'text',
        nullable: true
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true

    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp', //datetime for mysql
        nullable: true
    })
    publishedOn?: Date;


    tags?: string[];


    @OneToOne(() => MetaOption,
        (metaOpt) => metaOpt.post //yaha btana he metaOption table me post kaha he
        , {
            cascade: true,
            eager: true //use this to get metaOptions in result also when getting posts, or use relation obj in service which is recommended
        }) //for one to one relations, these tags are must

    // @JoinColumn() // FK is stored in post column because of this decorator.
    //Moving FK in meta-option to cascase delete    

    metaOption?: MetaOption;

}