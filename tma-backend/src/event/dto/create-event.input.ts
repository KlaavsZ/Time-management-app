import { Field, InputType, Int } from "@nestjs/graphql";
import { IsString, Length, MinLength } from "class-validator";

@InputType()
export class CreateEventInput{

    @IsString()
    @Length(3,40)
    @Field(type =>String)
    title: string;

    @Field(type=>Date)
    start: Date;

    @Field(type=> Date)
    end: Date;

    @Field(type => Int)
    userId: number;
}