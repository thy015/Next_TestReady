import { IsDateString, IsEmpty, IsNotEmpty, IsNumber } from "class-validator"


export class CreateDiamondDto {
    @IsNumber()
    @IsNotEmpty()
    balance:number

    @IsNumber()
    @IsNotEmpty()
    total_earned:number
    
    @IsNumber()
    @IsNotEmpty()
    total_spent:number
    
}
