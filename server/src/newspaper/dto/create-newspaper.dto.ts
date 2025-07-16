import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNewspaperDto {
    @ApiProperty({
        example: "Breaking News: Technology Advances",
        description: "Tiêu đề bài báo"
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: "thriller",
        description: "Danh mục bài báo",
        enum: ['thriller', 'daily', 'horror', 'criminal', 'sport']
    })
    @IsEnum(['thriller', 'daily', 'horror', 'criminal', 'sport'])
    @IsNotEmpty()
    category: string;

    @ApiProperty({
        example: "Mô tả ngắn về bài báo này",
        description: "Mô tả bài báo"
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: "diamond",
        description: "Loại chi phí để đọc bài báo",
        enum: ['diamond', 'heart', 'free']
    })
    @IsEnum(['diamond', 'heart', 'free'])
    cost_type: string;

    @ApiProperty({
        example: 10,
        description: "Chi phí để đọc bài báo"
    })
    @IsNumber()
    cost: number;

    @ApiProperty({
        example: "Nội dung đầy đủ của bài báo...",
        description: "Nội dung bài báo"
    })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({
        example: "https://example.com/news-image.jpg",
        description: "URL hình ảnh bài báo",
        required: false
    })
    @IsOptional()
    @IsString()
    img: string;

    @ApiProperty({
        example: "https://example.com/news-audio.mp3",
        description: "URL file âm thanh bài báo",
        required: false
    })
    @IsOptional()
    @IsString()
    audio: string;

    @ApiProperty({
        example: "John Doe",
        description: "Tác giả bài báo"
    })
    @IsString()
    @IsNotEmpty()
    author: string;

    @ApiProperty({
        example: "Bản dịch tiếng Việt của bài báo...",
        description: "Bản dịch bài báo"
    })
    @IsString()
    @IsNotEmpty()
    translation: string;
}
