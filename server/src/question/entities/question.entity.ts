import { Part } from "src/part/entities/part.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    question:string

    @Column({type:"nvarchar",length:1500})
    content:string

    @Column({type:"enum",enum:["listening","reading",'direction']})
    questions_type:string

    @Column({default:5})
    score:number

    @Column({type:"enum",enum:["a","b","c","d"]})
    correctAnswer:string

    @Column({type:"nvarchar",length:1000})
    explanation:string

    @Column()
    start_time:number
    
    @Column({type:"json"})
    answers:any
    
    @Column()
    imgSrc:string
    
    @Column()
    audio:string

    @ManyToOne(()=>Part,(part)=>part.questions)
    part:Part

}