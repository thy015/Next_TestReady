import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseSectionDto {
    @ApiProperty({
        example: "Section 1: Introduction",
        description: "Tên phần khóa học"
    })
    @IsString()
    title: string;

    @ApiProperty({
        example: "Phần giới thiệu khóa học",
        description: "Mô tả phần khóa học",
        required: false
    })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({
        example: true,
        description: "Phần khóa học có đang hoạt động hay không",
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @ApiProperty({
        example: 1,
        description: "ID khóa học"
    })
    @IsNumber()
    course_id: number;
}
