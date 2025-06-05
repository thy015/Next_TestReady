import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Heart {
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

    @Column()
    recover_time:number

    @Column()
    max_amount:number
    
}
