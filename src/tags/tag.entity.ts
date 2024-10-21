import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique: true
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: false,
        unique: true
    })
    slug: string;


    @Column({
        type: 'text',
        nullable: true,
    })
    description?: string;


    @Column({
        type: 'text',
        nullable: true,
    })
    schema?: string;


    @Column({
        type: 'varchar',
        nullable: true,
        length: 1024
    })
    featuredImgUrl?: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @DeleteDateColumn() //it will only do soft delete, means add delete time only
    deleteDate: Date;
}