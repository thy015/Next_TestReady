import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({
        example: "user@gmail.com",
        description: "Email của người dùng"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "Password@123",
        description: "Mật khẩu của người dùng"
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
