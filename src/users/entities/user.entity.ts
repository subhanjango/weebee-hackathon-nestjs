import { Booking } from "../../bookings/entities/bookings.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name : 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ type: 'timestamp' })
    createdAt: string;

    @OneToMany(() => Booking , (booking) => booking.user)
    bookings : Booking[]
}