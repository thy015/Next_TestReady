import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Diamond {
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:true})
    balance:number

    @Column()
    total_earned:number
    
    @Column()
    total_spent:number

    @UpdateDateColumn()
    last_updated:Date

    @CreateDateColumn()
    created_at:Date
}
