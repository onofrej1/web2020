import {Entity, PrimaryGeneratedColumn, OneToMany, Column} from "typeorm";
import {MenuItem} from "./MenuItem";

@Entity()
export class Menu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @OneToMany(type => MenuItem, menuItem => menuItem.menu)
    menuItems: MenuItem[];
}