import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class CreateUserLessonDto {
    @ApiProperty({
        example: 1,
        description: "ID bài học"
    })
    @IsNumber()
    lesson_id: number;

    @ApiProperty({
        example: 25,
        description: "Số phút đã học"
    })
    @IsNumber()
    minutes:number;

}
