import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWordDto {

    @ApiProperty({
        example: "beautiful",
        description: "Từ vựng tiếng Anh"
    })
    @IsString()
    word: string;

    @ApiProperty({
        example: ["pleasing the senses or mind aesthetically", "of a very high standard; excellent"],
        description: "Định nghĩa tiếng Anh"
    })
    @IsString({ each: true })
    def: string[];

    @ApiProperty({
        example: "đẹp",
        description: "Nghĩa tiếng Việt"
    })
    @IsString()
    vie_def: string;

    @ApiProperty({
        example: "adjective",
        description: "Từ loại",
        enum: ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection']
    })
    @IsEnum(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'])
    part_of_speech: string;

    @ApiProperty({
        example: "/ˈbjuːtɪfl/",
        description: "Phiên âm"
    })
    @IsString()
    phonetic: string;

    @ApiProperty({
        example: ["She is a beautiful girl.", "The sunset was beautiful."],
        description: "Các câu ví dụ"
    })
    @IsString({ each: true })
    examples: string[];

    @ApiProperty({
        example: ["https://example.com/audio1.mp3", "https://example.com/audio2.mp3"],
        description: "Danh sách URL file âm thanh"
    })
    @IsString({ each: true })
    audios: string[];

    @ApiProperty({
        example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
        description: "Danh sách URL hình ảnh"
    })
    @IsString({ each: true })
    imgs: string[];

    @ApiProperty({
        example: 1,
        description: "ID chủ đề",
        required: false
    })
    @IsNumber()
    @IsOptional()
    topic_id: number;

}
