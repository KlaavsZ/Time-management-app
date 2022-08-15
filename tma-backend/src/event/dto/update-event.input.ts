import { Field, InputType } from "@nestjs/graphql";
import { IsDate, Length } from "class-validator";

@InputType()
export class UpdateEventInput {
    
    @Field(type =>String)
    @Length(3,40)
    title: string;

    @IsDate()
    @Field(type=>Date)
    start: Date;

    @IsDate()
    @Field(type=> Date)
    end: Date;
}