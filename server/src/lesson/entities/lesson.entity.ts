import { CourseSection } from "src/course_section/entities/course_section.entity";
import { UserLesson } from "src/user_lesson/entities/user_lesson.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content:string;

    @Column()
    video: string;

    @Column()
    durations:number;

    @Column({default: false})
    idFinish:boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @ManyToOne(() => CourseSection, (courseSection) => courseSection.lessons, {
        eager: true,
    }) 
    courseSection: CourseSection;

    @ManyToOne(()=>UserLesson,()=>UserLesson=>UserLesson.lesson)
    users: UserLesson[];    
}
