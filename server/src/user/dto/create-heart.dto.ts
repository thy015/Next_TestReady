import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmpty, IsNotEmpty, IsNumber } from "class-validator"


export class CreateHeartDto {
    @ApiProperty({
        example: 5,
        description: "Số tim hiện tại của người dùng"
    })
    @IsNumber()
    @IsNotEmpty()
    balance:number

    @ApiProperty({
        example: 50,
        description: "Tổng số tim đã kiếm được"
    })
    @IsNumber()
    @IsNotEmpty()
    total_earned:number
    
    @ApiProperty({
        example: 45,
        description: "Tổng số tim đã tiêu"
    })
    @IsNumber()
    @IsNotEmpty()
    total_spent:number

    @ApiProperty({
        example: 1800,
        description: "Thời gian phục hồi (giây)"
    })
    @IsNumber()
    @IsNotEmpty()
    recover_time:number

    @ApiProperty({
        example: 5,
        description: "Số tim tối đa có thể có"
    })
    @IsNumber()
    @IsNotEmpty()
    max_amount:number
    
}
