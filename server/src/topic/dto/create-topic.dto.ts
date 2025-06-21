import { IsEnum, IsString } from "class-validator";

export class CreateTopicDto {
    @IsString()
    name: string;

    @IsEnum(['TOEIC', 'IELTS'])
    category: string;
          
}
