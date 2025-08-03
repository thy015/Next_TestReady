import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCheckoutDto {
    @IsString()
    name: string

    @IsNumber()
    price: number

    @IsNumber()
    price_per_month: number

    @IsNumber()
    duration: number

    @IsNumber()
    discount: number

    @IsNumber()
    idPackage: number
    
    @IsOptional()
    @IsString()
    idCus:number
}
