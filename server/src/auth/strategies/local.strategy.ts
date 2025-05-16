import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from "../auth.service";
import { CreateAuthDto } from "../dto/create-auth.dto";
@Injectable()
export  class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService : AuthService){
        super({usernameField:"email"})
    }

    async validate(email:string, password :string) {
        console.log("Local strategy")
        const acess_token = await this.authService.validateUser({email,password})
        if(!acess_token) throw new UnauthorizedException("Email hoặc mật khẩu không đúng !");
        return acess_token
    }
}