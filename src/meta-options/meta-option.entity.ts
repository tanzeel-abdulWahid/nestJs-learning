import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'json',
        nullable: false
    })
    metaValue: string

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    // For BiDirection ==> yaha btana he post table me meta  option kahan he
    @OneToOne(() => Post, (post) => post.metaOption)
    post: Post;
}