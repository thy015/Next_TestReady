import { IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {

    @IsString()
    @IsNotEmpty()
    question:string

    @IsString()
    @IsNotEmpty()
    questions_text:string

    @IsEnum(["listening","reading"])
    @IsNotEmpty()
    questions_type:string

    @IsNumber()
    score:number

    @IsEnum(["a","b","c","d"])
    @IsNotEmpty()
    corret_ans:string

    @IsString()
    explanation:string

    @IsBoolean()
    isFlag:boolean

    @IsJSON()
    answer:JSON

    @IsString()
    @IsOptional()
    img:string

    @IsString()
    @IsOptional()
    audio:string

    @IsNumber()
    @IsNotEmpty()
    part_id:number
}
