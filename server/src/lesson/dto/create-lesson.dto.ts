import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    video: string;

    @IsNumber()
    durations: number;

    @IsBoolean()
    isFinish: boolean;

    @IsNumber()
    course_section_id: number;
}
