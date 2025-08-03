import { PartResult } from "src/part_result/entities/part_result.entity";
import { Diamond } from "./diamond.entity";
import { Heart } from "./heart.entity";
import { Column, CreateDateColumn, Entity, EntityRepository, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { UserLesson } from "src/user_lesson/entities/user_lesson.entity";
import { WordUser } from "src/word_user/entities/word_user.entity";
import { TopicUser } from "src/topic_user/entities/topic_user.entity";
import { Checkout } from "src/checkout/entities/checkout.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    fullname:string
    
    @Column()
    email:string

    @Column()
    birthday:Date

    @Column()
    password:string

    @Column()
    isValid:boolean

    @Column()
    phone_number:string

    @CreateDateColumn()
    created_at :string

    @UpdateDateColumn()
    updated_at:string

    @Column()
    topup_amount:string

    // FK
    @OneToOne(()=>Heart,(heart)=>heart.id)
    @JoinColumn()
    heart:Heart


    @OneToOne(()=>Diamond,(diamond)=>diamond.id)
    @JoinColumn()
    diamond:Diamond

    @OneToMany(()=>PartResult,(part_result)=> part_result.user)
    part_results:PartResult[]

    @OneToMany(()=>UserLesson,(user_lesson)=> user_lesson.user,)
    lessons:UserLesson[]

    @OneToMany(()=>WordUser,(word_user)=>word_user.user)
    words:WordUser[]

    @OneToMany(()=>TopicUser,(topic_user)=>topic_user.user)
    topics:TopicUser[]

    @OneToMany(()=>Checkout,checkOut => checkOut.user)
    packages:Checkout[]
}
