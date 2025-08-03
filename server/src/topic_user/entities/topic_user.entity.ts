import { Topic } from "src/topic/entities/topic.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TopicUser {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    isDone:boolean

    @ManyToOne(()=>User,(user)=>user.topics)
    user:User

    @ManyToOne(()=>Topic,(topic)=>topic.users)
    topic:Topic
}
