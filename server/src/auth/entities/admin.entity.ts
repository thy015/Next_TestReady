import { Entity, PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    fullname:string

    @Column()
    email:string

    @Column()
    password:string

    @CreateDateColumn()
    created_at:Date

    @Column()
    last_login:Date
}
