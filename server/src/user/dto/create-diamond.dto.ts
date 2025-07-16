import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDiamondDto {
    @ApiProperty({
        example: 100,
        description: "Số kim cương hiện có"
    })
    @IsNumber()
    @IsNotEmpty()
    balance: number;

    @ApiProperty({
        example: 500,
        description: "Tổng kim cương đã kiếm được"
    })
    @IsNumber()
    @IsNotEmpty()
    total_earned: number;

    @ApiProperty({
        example: 400,
        description: "Tổng kim cương đã tiêu"
    })
    @IsNumber()
    @IsNotEmpty()
    total_spent: number;
}
