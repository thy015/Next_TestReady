import { CateCourseMobile } from "src/cate_course_mobile/entities/cate_course_mobile.entity";
import { Topic } from "src/topic/entities/topic.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class    CourseMobile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_en: string;

    @Column()
    name_vi: string;

    @Column()
    img: string;

    @ManyToOne(() => CateCourseMobile, (cateCourseMobile) => cateCourseMobile.id, { nullable: true })
    cateCourseMobile: CateCourseMobile;

    @OneToMany(() => Topic, (topic) => topic.courseMobile, {
        nullable: true
    })
    topics: Topic[];
}
