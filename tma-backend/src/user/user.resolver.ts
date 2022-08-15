import { UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {}


    @Query(returns => [User])
    @UseGuards(JwtAuthGuard)
    users(): Promise<User[]>{
        return this.userService.findAll()
    }

    @Mutation(returns => Boolean)
    deleteUser(@Args('id', {type: () => Int}) id: number ): Promise<boolean>{
        return this.userService.remove(id);

    }
}