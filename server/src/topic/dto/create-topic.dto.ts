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
        example: "Kinh doanh",
        description: "Tên chủ đề ( Tiếng việt )"
    })
    @IsString()
    nameVN: string;   

    @ApiProperty({
        example: "https://example.com/image.jpg",
        description: "URL hình ảnh"
    })
    @IsString()
    img:string;



    @ApiProperty({
        example: "TOEIC",
        description: "Danh mục chủ đề",
        enum: ['TOEIC CƠ BẢN',"IELTS CƠ BẢN","TOEIC NÂNG CAO","IELTS NÂNG CAO"]
    })
    @IsEnum(['TOEIC CƠ BẢN',"IELTS CƠ BẢN","TOEIC NÂNG CAO","IELTS NÂNG CAO"])
    category: string;
          
    @IsString()
    @IsOptional()
    course_mobile_id?: string;
}
