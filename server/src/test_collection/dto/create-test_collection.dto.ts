import { IsNotEmpty, IsString } from "class-validator";

export class CreateTestCollectionDto {
    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsString()
    descriptions:string
}
