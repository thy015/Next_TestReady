import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {

    @ApiProperty({
        example: "What is the man doing?",
        description: "Nội dung câu hỏi"
    })
    @IsString()
    @IsNotEmpty()
    question:string

    @ApiProperty({
        example: "Please choose the best answer for this question",
        description: "Văn bản hướng dẫn câu hỏi"
    })
    @IsString()
    questions_text:string

    @ApiProperty({
        example: "listening",
        description: "Loại câu hỏi",
        enum: ["listening","reading","direction"]
    })
    @IsEnum(["listening","reading","direction"])
    @IsNotEmpty()
    questions_type:string

    @ApiProperty({
        example: 1,
        description: "Điểm số của câu hỏi"
    })
    @IsNumber()
    score:number

    @ApiProperty({
        example: "a",
        description: "Đáp án đúng",
        enum: ["a","b","c","d"]
    })
    @IsEnum(["a","b","c","d"])
    @IsNotEmpty()
    correct_ans:string

    @ApiProperty({
        example: "This is the correct answer because...",
        description: "Giải thích đáp án"
    })
    @IsString()
    explanation:string

    @ApiProperty({
        example: 120,
        description: "Thời gian bắt đầu câu hỏi (giây)"
    })
    @IsNumber()
    start_time:number

    @ApiProperty({
        example: {"a": "Option A", "b": "Option B", "c": "Option C", "d": "Option D"},
        description: "Các lựa chọn trả lời"
    })
    @IsJSON()
    answer:JSON

    @ApiProperty({
        example: "https://example.com/question-image.jpg",
        description: "URL hình ảnh câu hỏi",
        required: false
    })
    @IsString()
    @IsOptional()
    img:string

    @ApiProperty({
        example: "https://example.com/question-audio.mp3",
        description: "URL file âm thanh câu hỏi",
        required: false
    })
    @IsString()
    @IsOptional()
    audio:string

    @ApiProperty({
        example: 1,
        description: "ID phần thi"
    })
    @IsNumber()
    @IsNotEmpty()
    part_id:number
}
