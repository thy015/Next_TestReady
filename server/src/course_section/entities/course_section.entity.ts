import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Course } from "src/course/entities/course.entity";
import { Lesson } from "src/lesson/entities/lesson.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CourseSection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string;

    @Column({type: 'text'})
    description:string;

    @Column({default: true}) 
    isActive:boolean;

    @ManyToOne(() => Course, (course) => course.courseSections)
    course: Course;

    @OneToMany(()=>Lesson, (lesson) => lesson.courseSection)
    lessons: Lesson[];
}
