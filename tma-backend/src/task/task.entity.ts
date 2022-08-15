import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Index, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";

@Entity()
@ObjectType()
export class Task{
    @PrimaryGeneratedColumn('increment')
    @Field(type => Int)
    id: number;

    @Field(type => String)
    @Column({ length: 50 })
    name: string;
    
    @Field(type => String, {nullable: true})
    @Column({ nullable: true})
    description: string;

    @Field(type => Boolean)
    @Column()
    done: boolean = false;

    @Field()
    @Column()
    start: Date;

    @Field()
    @Column()
    end: Date;

    @Field()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    updatedAt: Date;

    @Field(type => Int)
    @Column()
    userId: number;

    @Field(type => User)
    @ManyToOne(() => User, user => user.tasks)
    user: User;

}