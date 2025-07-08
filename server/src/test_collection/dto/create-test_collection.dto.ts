import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTestCollectionDto {
    @ApiProperty({
        example: "TOEIC Practice Tests",
        description: "Tên bộ sưu tập test"
    })
    @IsString()
    @IsNotEmpty()
    name:string
    
    @ApiProperty({
        example: "Bộ sưu tập các bài test TOEIC thực hành",
        description: "Mô tả bộ sưu tập test"
    })
    @IsString()
    descriptions:string
}
