import { Part } from "src/part/entities/part.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PartResult {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    total_corret:number

    @Column()
    total_incorret:number

    @Column()
    total_question:number

    @Column()
    durations:number

    @Column()
    score:number

    @CreateDateColumn()
    created_at:Date

    @ManyToOne(()=>Part,(part)=>part.part_results)
    part:Part


    @ManyToOne(()=>User, (user)=>user.part_results)
    user:User

}
