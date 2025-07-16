import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCourseDto {

    @ApiProperty({
        example: "TOEIC Complete Course",
        description: "Tên khóa học"
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: "Khóa học TOEIC toàn diện từ cơ bản đến nâng cao",
        description: "Mô tả khóa học"
    })
    @IsString()
    description: string;

    @ApiProperty({
        example: "https://example.com/course-image.jpg",
        description: "URL hình ảnh khóa học",
        required: false
    })
    @IsString()
    @IsOptional()
    image: string;

    @ApiProperty({
        example: 299000,
        description: "Giá khóa học (VND)"
    })
    @IsNumber()
    price: number; 

    @ApiProperty({
        example: 199000,
        description: "Giá khuyến mãi (VND)",
        required: false
    })
    @IsNumber()
    @IsOptional()
    discount_price: number; 
    
    @ApiProperty({
        example: false,
        description: "Khóa học có miễn phí hay không"
    })
    @IsBoolean()
    isFree: boolean;

    @ApiProperty({
        example: true,
        description: "Khóa học có đang hoạt động hay không"
    })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        example: 1,
        description: "ID danh mục khóa học"
    })
    @IsNumber()
    @IsNotEmpty()
    category_course_id: number; 
}

