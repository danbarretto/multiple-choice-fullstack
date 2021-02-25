import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Option } from './Option'


@Entity()
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @OneToMany(() => Option, option => option.exercise)
    options: Option[]
}