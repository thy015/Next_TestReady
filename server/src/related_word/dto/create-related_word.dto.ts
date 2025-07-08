import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateRelatedWordDto {
    @ApiProperty({
        example: 1,
        description: "ID của từ gốc"
    })
    @IsNumber()
    word_id: number;

    @ApiProperty({
        example: "beautiful",
        description: "Từ liên quan"
    })
    @IsString()
    related_word: string;

    @ApiProperty({
        example: "synonym",
        description: "Loại mối quan hệ giữa các từ",
        enum: ['synonym', 'antonym', 'hypernym', 'hyponym', 'meronym', 'holonym']
    })
    @IsEnum(['synonym', 'antonym', 'hypernym', 'hyponym', 'meronym', 'holonym'])
    related_type: string; // e.g., 'synonym', 'antonym', 'hypernym', 'hyponym', 'meronym', 'holonym'
}
