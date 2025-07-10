import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryCourseDto {

    @ApiProperty({
        example: "TOEIC",
        description: "Tên danh mục khóa học"
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "600-750",
        description: "Cấp độ của khóa học",
        enum: ["450-600","600-750","600+","750-880","800+","900+"]
    })
    @IsEnum(["450-600","600-750","600+","750-880","800+","900+"])
    level:string;

    @ApiProperty({
        example: "Danh mục các khóa học TOEIC cấp độ trung cấp",
        description: "Mô tả danh mục khóa học"
    })
    @IsString()
    @IsNotEmpty()
    description: string;
}
