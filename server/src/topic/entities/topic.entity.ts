import { Word } from "src/word/entities/word.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column({type:"enum",enum:['TOEIC',"IELTS"],default:'TOEIC'})
    category: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(()=>Word,(word)=>word.topics)
    @JoinTable()
    words: Word[];
}
