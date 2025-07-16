import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({
        example: "Admin Name",
        description: "Tên đầy đủ của admin"
    })
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty({
        example: "admin@gmail.com",
        description: "Email của admin"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "AdminPass@123",
        description: "Mật khẩu của admin"
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}