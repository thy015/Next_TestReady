import { Part } from "src/part/entities/part.entity";
import { TestCollection } from "src/test_collection/entities/test_collection.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    timeUserTest: number

    @Column()
    isActive: boolean


    // @Column({type:"int", default:120})
    // durations:number

    // @Column({type:"int",default:990})
    // score:number

    @ManyToOne(() => TestCollection, (testCollection) => testCollection.test, {
        eager: true
    })
    testCollection: TestCollection

    @OneToMany(() => Part, part => part.test, {
        eager: true
    })
    parts: Part[]

}
