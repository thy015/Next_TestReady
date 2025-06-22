import { Test } from "src/test/entities/test.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TestCollection {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
    
    @Column({type:"nvarchar",length:725})
    descriptions:string

    @UpdateDateColumn()
    updated_at:Date

    @CreateDateColumn()
    created_at:Date

    @OneToMany(()=>Test,(test)=>test.testCollection)
    test: Test[]
}