import { Lesson } from "src/lesson/entities/lesson.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserLesson {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:0})
    progress:number;

    @Column({default:0})
    minutes:number;

    @Column({default:false})
    is_completed:boolean;

    @ManyToOne(()=>User,(user)=>user.lessons)
    user:User;

    @ManyToOne(()=>Lesson,(lesson)=>lesson.users)
    lesson:Lesson;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}
