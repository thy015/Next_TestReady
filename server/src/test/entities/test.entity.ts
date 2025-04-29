import { TestCollection } from "src/test_collection/entities/test_collection.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
    
    @Column({type:"int", default:120})
    durations:number

    @Column({type:"int",default:990})
    score:number

    @ManyToOne(()=>TestCollection,(testCollection)=>testCollection.test,{
        eager:true
    })
    testCollection:TestCollection
}
