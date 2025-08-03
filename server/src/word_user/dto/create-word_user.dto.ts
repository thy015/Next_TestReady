import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateWordUserDto {
    @IsNumber()
    wordID: number

    @IsString()
    state:string
}
