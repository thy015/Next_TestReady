import { TopicUser } from "src/topic_user/entities/topic_user.entity";
import { Word } from "src/word/entities/word.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;

    @Column()
    nameVN: string;

    @Column({default:false})
    isFree:boolean

    @Column({type:"enum",enum:['TOEIC CƠ BẢN',"IELTS CƠ BẢN","TOEIC NÂNG CAO","IELTS NÂNG CAO"],default:'TOEIC CƠ BẢN'})
    category: string;

    @Column()
    img:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Word, (word) => word.topic)
    words: Word[];

    @OneToMany(()=>TopicUser,(topic_user)=>topic_user.user)
    users:TopicUser[]
}
