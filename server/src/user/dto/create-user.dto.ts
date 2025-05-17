import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullname:string
    
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsStrongPassword()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    phone_number:string

    @IsDateString()
    birthday:Date
}
