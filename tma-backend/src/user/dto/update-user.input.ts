import { Field, InputType } from "@nestjs/graphql";
import { Column } from "typeorm";

@InputType()
export class UpdateUserInput {

    @Field()
    username: string;

    @Field()
    password: string;

    
}