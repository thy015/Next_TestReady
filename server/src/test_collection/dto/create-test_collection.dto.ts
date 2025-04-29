import { IsString } from "class-validator";

export class CreateTestCollectionDto {
    @IsString()
    name:string
    
    @IsString()
    descriptions:string
}
