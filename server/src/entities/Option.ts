import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exercise } from "./Exercise";

@Entity()
export class Option{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    content:string

    @ManyToOne(()=>Exercise, exercise=>exercise.options)
    exercise:Exercise

}