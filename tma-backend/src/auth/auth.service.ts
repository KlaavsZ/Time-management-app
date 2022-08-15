import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService){}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if(!user) return null

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if(passwordsMatch){
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        return {
            accessToken: this.jwtService.sign({
                username: user.username,
                sub: user.id
            }),
            user,
        }
    }
    
    async signup(createUserInput: CreateUserInput): Promise<any> {
        const user = await this.userService.findOneByUsername(createUserInput.username);
        if(user) return null;
        const password = await bcrypt.hash(createUserInput.password, 10)
        return this.userService.create({
            ...createUserInput,
            password,
        })
    }
}
