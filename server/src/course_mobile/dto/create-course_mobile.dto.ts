import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseMobileDto {
    @IsString()
    name_en: string;

    @IsString()
    name_vi: string;

    @IsString()
    @IsOptional()
    img?: string;

    @IsNumber()
    @IsOptional()
    category_id?: number;    
}
