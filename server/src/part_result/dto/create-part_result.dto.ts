import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePartResultDto {

    @IsNumber()
    total_corret:number

    @IsNumber()
    total_incorret:number

    @IsNumber()
    total_question:number

    @IsNumber()
    durations:number

    @IsNumber()
    score:number

    @IsNumber()
    @IsNotEmpty()
    part_id:number

}
