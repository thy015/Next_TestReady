import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePartResultDto {

    @ApiProperty({
        example: 18,
        description: "Số câu trả lời đúng"
    })
    @IsNumber()
    total_corret:number

    @ApiProperty({
        example: 2,
        description: "Số câu trả lời sai"
    })
    @IsNumber()
    total_incorret:number

    @ApiProperty({
        example: 20,
        description: "Tổng số câu hỏi"
    })
    @IsNumber()
    total_question:number

    @ApiProperty({
        example: 1800,
        description: "Thời gian làm bài (giây)"
    })
    @IsNumber()
    durations:number

    @ApiProperty({
        example: 450,
        description: "Điểm số đạt được"
    })
    @IsNumber()
    score:number

    @ApiProperty({
        example: 1,
        description: "ID phần thi"
    })
    @IsNumber()
    @IsNotEmpty()
    part_id:number

}
