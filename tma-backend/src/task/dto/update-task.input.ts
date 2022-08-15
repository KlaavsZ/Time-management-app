import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";

@InputType()
export class UpdateTaskInput{
    
    @IsString()
    @Length(3,40)
    @Field(type => String)
    name: string;
    
    @IsString()
    @Length(0,40)
    @Field(type => String, { nullable:true})
    description?: string;    
    
    @IsBoolean()
    @Field(type => Boolean)
    done: boolean;

    @Field()
    start: Date;

    @Field()
    end: Date;
}