import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseSectionDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean ()
    @IsOptional()
    isActive: boolean;

    @IsNumber()
    course_id:number
    
}
