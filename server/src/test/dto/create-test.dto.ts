import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTestDto {

    @IsString()
    name:string

    @IsNumber()
    @IsEmpty()
    durations:number

    @IsNumber()
    @IsEmpty()
    max_score:number

    @IsNumber()
    @IsNotEmpty()
    collection_id:number

}
