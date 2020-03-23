import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from "typeorm";

@Entity()
export class Runner {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "first_name"})
    firstName: string;

    @Column({name: "last_name"})
    lastName: string;

    @Column()
    born: string;
}