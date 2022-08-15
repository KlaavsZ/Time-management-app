import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Event{

    @PrimaryGeneratedColumn('increment')
    @Field(type => Int)
    id: number;

    @Field(type =>String)
    @Column()
    title: string;

    @Field()
    @Column()
    start: Date;

    @Field()
    @Column()
    end: Date;

    @Field(type => User)
    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @Field(type => Int)
    @Column()
    userId: number;

}