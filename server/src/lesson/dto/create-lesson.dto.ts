import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @ApiProperty({
        example: "Lesson 1: Basic Grammar",
        description: "Tên bài học"
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: "Nội dung bài học về ngữ pháp cơ bản",
        description: "Nội dung bài học"
    })
    @IsString()
    content: string;

    @ApiProperty({
        example: "https://example.com/video.mp4",
        description: "URL video bài học"
    })
    @IsString()
    video: string;

    @ApiProperty({
        example: 30,
        description: "Thời lượng bài học (phút)"
    })
    @IsNumber()
    durations: number;

    @ApiProperty({
        example: false,
        description: "Bài học đã hoàn thành hay chưa"
    })
    @IsBoolean()
    isFinish: boolean;

    @ApiProperty({
        example: 1,
        description: "ID phần khóa học"
    })
    @IsNumber()
    course_section_id: number;
}
