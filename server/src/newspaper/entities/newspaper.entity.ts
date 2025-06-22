import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Newspaper {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    title: string;

    @Column({ type: 'text' })
    description: string;
    
    @Column({ type: 'enum', enum: ['thriller', 'daily', 'horror', 'criminal', 'sport'] })
    category: string;

    @Column({ type: 'enum', enum: ['diamond', 'heart', 'free'], default: 'diamond' })
    cost_type: string;

    @Column({ default: 50 })
    cost: number;

    @Column({ type: 'text' })
    content: string;

    @Column()
    img: string;

    @Column()
    audio: string;

    @Column()
    author: string;

    @Column({ type: 'text' })
    translation: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
