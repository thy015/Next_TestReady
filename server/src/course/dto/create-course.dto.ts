import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsNumber()
    price: number; 

    @IsNumber()
    @IsOptional()
    discount_price: number; 
    
    @IsBoolean()
    isFree: boolean;

    @IsBoolean()
    isActive: boolean;

    @IsNumber()
    @IsNotEmpty()
    category_course_id: number; 
}

