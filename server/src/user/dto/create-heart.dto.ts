import { IsDateString, IsEmpty, IsNotEmpty, IsNumber } from "class-validator"


export class CreateHeartDto {
    @IsNumber()
    @IsNotEmpty()
    balance:number

    @IsNumber()
    @IsNotEmpty()
    total_earned:number
    
    @IsNumber()
    @IsNotEmpty()
    total_spent:number

    @IsNumber()
    @IsNotEmpty()
    recover_time:number

    @IsNumber()
    @IsNotEmpty()
    max_amount:number
    
}
