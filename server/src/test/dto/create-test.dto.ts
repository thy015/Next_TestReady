import { IsEmpty, IsNotEmpty, IsNotIn, IsNumber, IsString } from "class-validator";

export class CreateTestDto {

    @IsString()
    @IsNotEmpty()
    name:string

    @IsNumber()
    durations:number

    @IsNumber()
    max_score:number

    @IsNumber()
    @IsNotEmpty()
    collection_id:number

}
