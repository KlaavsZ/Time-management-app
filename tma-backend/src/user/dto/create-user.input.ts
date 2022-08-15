import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";

@InputType()
export class CreateUserInput{

    @IsEmail()
    @Field(type=>String)
    email: string;

    @IsString()
    @Field()
    username: string;

    @IsString()
    @Field()
    password: string;
}