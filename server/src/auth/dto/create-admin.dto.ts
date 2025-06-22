import { IsEmail,IsString,IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @IsEmail()
    email:string

    @IsString()
    fullname:string

    @IsStrongPassword()
    password:string
    
    
}