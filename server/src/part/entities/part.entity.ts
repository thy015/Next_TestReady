import { Test } from "src/test/entities/test.entity";
import { Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Part {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:'enum',enum:[1,2,3,4,5,6]})
    name: number

    @Column({type:'enum',enum:["listening","reading"]})
    type:string 

    @Column()
    total_question:number

    @Column({default:30})
    durations:number

    @ManyToOne(()=>Test,(test)=>test.parts)
    test:Test
}
