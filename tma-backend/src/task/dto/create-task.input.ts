import { Field, InputType, Int } from "@nestjs/graphql";
import { IsDate, IsString, Length, Min, MinLength } from 'class-validator'

@InputType()
export class CreateTaskInput{

    @IsString()
    @Length(3, 40)
    @Field(type => String)
    name: string;
    
    @IsString()
    @Length(0,40)
    @Field(type => String, {nullable: true})
    description?: string;

    @IsDate()
    @Field(type=>Date)
    start: Date;

    @IsDate()
    @Field(type=>Date)
    end: Date;

    @Field(type => Int)
    userId: number;
    
}