import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from "typeorm";
import {Event} from "./Event";

@Entity()
export class Run {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    run: string;

    @Column()
    locality: string;

    @OneToMany(type => Event, event => event.run)
    events: Event[];
}