import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNewspaperDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsEnum(['thriller', 'daily', 'horror', 'criminal', 'sport'])
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(['diamond', 'heart', 'free'])
    cost_type: string;

    @IsNumber()
    cost: number;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsString()
    img: string;

    @IsOptional()
    @IsString()
    audio: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    translation: string;
}
