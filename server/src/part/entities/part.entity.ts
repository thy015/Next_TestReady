import { PartResult } from "src/part_result/entities/part_result.entity";
import { Question } from "src/question/entities/question.entity";
import { Test } from "src/test/entities/test.entity";
import { Column, Entity, IsNull, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Part {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'enum',enum:[1,2,3,4,5,6,7]})
    name: number

    @Column({type:'enum',enum:["listening","reading"]})
    type:string 

    @Column({type:"text"})
    directions_img:string

    @Column()
    total_question:number

    // @Column({default:30})
    // durations:number

    @Column()
    end_time:number

    @ManyToOne(()=>Test,(test)=>test.parts)
    test:Test

    @OneToMany(()=>Question,(question)=>question.part,{
        eager:true
    })
    questions: Question[]

    @OneToMany(()=>PartResult,(part_result)=>part_result.part)
    part_results:PartResult[]
}
