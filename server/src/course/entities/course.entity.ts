import { CategoryCourse } from "src/category_course/entities/category_course.entity";
import { CourseSection } from "src/course_section/entities/course_section.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column({default:0})
    discount_price: number;

    @Column({default:false})
    isFree:boolean;

    @Column({default:true})
    isActive:boolean;   

    @CreateDateColumn() 
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;

    @ManyToOne(() => CategoryCourse, (categoryCourse) => categoryCourse.courses,{
        eager: true,
    })
    categoryCourse: CategoryCourse;

    @OneToMany(() => CourseSection, (section) => section.course)   
    courseSections: CourseSection[]; 
}
