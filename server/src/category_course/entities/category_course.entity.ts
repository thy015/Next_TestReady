
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CategoryCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type:'enum',enum:["450-600","600-750","600+","750-880","800+","900+"]})
    level:string

    @Column({type:'text'})
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => CategoryCourse, (categoryCourse) => categoryCourse.id)
    courses: CategoryCourse[];
}
