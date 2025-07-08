import { Course } from "src/course/entities/course.entity";
import { CourseMobile } from "src/course_mobile/entities/course_mobile.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CateCourseMobile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => CourseMobile, (course) => course.cateCourseMobile)
    cateCourses: CourseMobile[];
}
