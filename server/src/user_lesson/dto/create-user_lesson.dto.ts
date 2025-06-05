import { IsNumber } from "class-validator";


export class CreateUserLessonDto {
    @IsNumber()
    lesson_id: number;

    @IsNumber()
    minutes:number;

}
