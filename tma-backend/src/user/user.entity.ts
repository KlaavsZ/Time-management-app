import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Event } from "src/event/event.entity";
import { Task } from "src/task/task.entity";
import { Entity, PrimaryGeneratedColumn, Index, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field(type => Int)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field(type => String)
    @Index({unique: true})
    @Column('varchar', { length: 500, nullable:true})
    email: string | null = null;
    
    @Field(type => String)
    @Column('varchar', {length: 1000})
    password: string;

    @Field(type=> String)
    @Column('varchar', { length: 50 })
    username: string;

    @Field()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Field(type => [Task])
    @OneToMany(() => Task, task => task.user)
    tasks?: Task[];

    @Field(type => [Event])
    @OneToMany(() => Event, event => event.user)
    events?: Event[];
}