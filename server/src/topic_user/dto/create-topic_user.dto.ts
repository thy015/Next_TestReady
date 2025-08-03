import { IsBoolean, IsNumber } from "class-validator";

export class CreateTopicUserDto {
    @IsBoolean()
    isDone:boolean

    @IsNumber()
    topicID:number
}
