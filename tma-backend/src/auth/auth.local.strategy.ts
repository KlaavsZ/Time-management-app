import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }
    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validateUser(username, password);
        if(!user){
            throw new UnauthorizedException("User validation failed");
        }
        console.log(user)
        return user;
    }   
}