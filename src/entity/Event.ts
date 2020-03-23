import {Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne} from "typeorm";
import {Run} from "./Run";

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @ManyToOne(type => Run, run => run.events)
    run: Run;
}