import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateWordDto {

    @IsString()
    word: string;

    @IsString({ each: true })
    def: string[];

    @IsString()
    vie_def: string;

    @IsEnum(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection'])
    part_of_speech: string;

    @IsString()
    phonetic: string;

    @IsString({ each: true })
    examples: string[];

    @IsString({ each: true })
    audios: string[];

    @IsString({ each: true })
    imgs: string[];

    @IsNumber()
    @IsOptional()
    topic_id: number;

}
