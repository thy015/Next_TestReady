import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateTopicDto {
    @ApiProperty({
        example: "Business English",
        description: "Tên chủ đề"
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: "TOEIC",
        description: "Danh mục chủ đề",
        enum: ['TOEIC', 'IELTS']
    })
    @IsEnum(['TOEIC', 'IELTS'])
    category: string;
          
    @IsString()
    @IsOptional()
    course_mobile_id?: string;
}
