import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService){}

    @UseGuards(GqlAuthGuard)
    @Mutation(()=> LoginResponse)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.user);
    }

    @Mutation(() => User)
    signup(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.authService.signup(createUserInput)
    }

}
