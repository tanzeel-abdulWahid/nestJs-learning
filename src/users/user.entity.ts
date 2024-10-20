import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false
    })
    fname: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true
    })
    lname: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: false
    })
    password: string;
}