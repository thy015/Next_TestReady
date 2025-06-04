import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryCourseDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(["450-600","600-750","600+","750-880","800+","900+"])
    level:string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
