import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class LoginUserInput{

    @Field()
    username: string;

    @Field()
    password: string;
}