import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateRelatedWordDto {
    @IsNumber()
    word_id: number;

    @IsString()
    related_word: string;

    @IsEnum(['synonym', 'antonym', 'hypernym', 'hyponym', 'meronym', 'holonym'])
    related_type: string; // e.g., 'synonym', 'antonym', 'hypernym', 'hyponym', 'meronym', 'holonym'
}
