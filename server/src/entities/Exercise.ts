import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity,  ObjectIdColumn } from "typeorm";

@Entity()
@ObjectType()
export class Exercise extends BaseEntity {

    @Field()
    @ObjectIdColumn()
    _id: string

    @Field()
    @Column()
    question: string

    @Field(()=>[String])
    @Column()
    options: String[]

    @Field(()=>Int)
    @Column()
    correctOption:number
}