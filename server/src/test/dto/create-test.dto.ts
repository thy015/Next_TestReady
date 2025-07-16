import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsNotEmpty, IsNotIn, IsNumber, IsString } from "class-validator";

export class CreateTestDto {

    @ApiProperty({
        example: "TOEIC Test 1",
        description: "Tên bài test"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        example: 5,
        description: "Số lần người dùng làm bài test"
    })
    @IsNumber()
    @IsNotEmpty()
    timesUserTest: number

        @ApiProperty({
        example: 5,
        description: "Số lần người dùng làm bài test"
    })
    @IsBoolean({ each: true })
    isActive: boolean

    // @ApiProperty({
    //     example: 7200,
    //     description: "Thời lượng bài test (giây)"
    // })
    // @IsNumber()
    // durations: number

    // @ApiProperty({
    //     example: 990,
    //     description: "Điểm số tối đa của bài test"
    // })
    // @IsNumber()
    // max_score: number

    @ApiProperty({
        example: 1,
        description: "ID bộ sưu tập test"
    })
    @IsNumber()
    @IsNotEmpty()
    collection_id: number

}
