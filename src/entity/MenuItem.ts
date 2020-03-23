import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import {Menu} from "./Menu";
import {Page} from "./Page";

@Entity()
export class MenuItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @ManyToOne(type => Menu, menu => menu.menuItems)
    menu: Menu;

    @ManyToOne(type => MenuItem, menuItem => menuItem.children)
    parent: MenuItem;

    @OneToMany(type => MenuItem, menuItem => menuItem.parent)
    children: MenuItem[];

    @ManyToOne(type => Page)
    page: Page;
}