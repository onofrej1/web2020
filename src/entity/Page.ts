import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Page {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    body: string;
}