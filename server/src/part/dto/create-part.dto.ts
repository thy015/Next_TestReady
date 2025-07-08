import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePartDto {

    @ApiProperty({
        example: 1,
        description: "Số thứ tự của part (1-6)",
        enum: [1,2,3,4,5,6]
    })
    @IsNumber()
    @IsNotEmpty()
    @IsEnum([1,2,3,4,5,6])
    name:number

    @ApiProperty({
        example: "listening",
        description: "Loại part (listening hoặc reading)",
        enum: ["listening","reading"]
    })
    @IsString()
    @IsNotEmpty()
    @IsEnum(["listening","reading"])
    type:string

    @ApiProperty({
        example: 20,
        description: "Tổng số câu hỏi trong part"
    })
    @IsNumber()
    total_question:number

    @ApiProperty({
        example: 1800,
        description: "Thời lượng của part (giây)"
    })
    @IsNumber()
    durations:number
    
    @ApiProperty({
        example: 3600,
        description: "Thời gian kết thúc (giây)"
    })
    @IsNumber()
    end_time:number  

    @ApiProperty({
        example: "https://example.com/directions.jpg",
        description: "URL hình ảnh hướng dẫn",
        required: false
    })
    @IsString()
    @IsOptional()
    directions_img:string

    @ApiProperty({
        example: 1,
        description: "ID bài test"
    })
    @IsNotEmpty()
    @IsNumber()
    test_id:number
}
