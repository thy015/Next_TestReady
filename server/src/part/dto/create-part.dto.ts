import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePartDto {

    @IsNumber()
    @IsNotEmpty()
    @IsEnum([1,2,3,4,5,6])
    name:number

    @IsString()
    @IsNotEmpty()
    @IsEnum(["listening","reading"])
    type:string

    @IsNumber()
    total_question:number

    @IsNumber()
    durations:number
    
    @IsString()
    @IsOptional()
    directions_img:string

    @IsNotEmpty()
    @IsNumber()
    test_id:number
}
