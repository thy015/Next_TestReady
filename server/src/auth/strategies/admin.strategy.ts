import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { rejects } from "assert";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin-verify') {

    constructor(){
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey:"khongaibenem"

            }
        );
    }

    validate(payload: any) {

        if(!payload || payload.role !== 'admin') {
            throw new UnauthorizedException("Không có quyền admin!");
        }   
        return payload;
    }
}