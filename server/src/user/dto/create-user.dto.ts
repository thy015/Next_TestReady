import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: "Nguyen Van A",
        description: "Full name of the user"
    })
    @IsString()
    @IsNotEmpty()
    fullname:string
    
    @ApiProperty({
        example: "phuc@gmail.com",
        description: "Email of the user"
    })
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        example: "Phuc@123",
        description: "Phone number of the user"
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password:string

    @ApiProperty({
        example: "0123456789",
        description: "Phone number of the user"
    })
    @IsString()
    @IsNotEmpty()
    phone_number:string

    @ApiProperty({
        example: "2023-10-01",
        description: "Birthday of the user"
    })
    @IsDateString()
    birthday:Date
}
