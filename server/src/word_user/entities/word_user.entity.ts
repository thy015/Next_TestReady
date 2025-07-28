import { User } from "src/user/entities/user.entity";
import { Word } from "src/word/entities/word.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WordUser {
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({type:"enum",enum:["Đã học","Đã nhớ","Đã thuộc"]})
    state:string

    @ManyToOne(()=>User,(user)=>user.words)
    user:User

    @ManyToOne(()=>Word,(word)=>word.users)
    word:Word
}
