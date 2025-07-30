import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Checkout {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_package: number

    @Column({ type: 'timestamp' })
    expirePackage: Date;

    @ManyToOne(() => User, user => user.packages)
    user: User
}
