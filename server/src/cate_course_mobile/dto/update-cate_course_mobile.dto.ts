import { PartialType } from '@nestjs/swagger';
import { CreateCateCourseMobileDto } from './create-cate_course_mobile.dto';

export class UpdateCateCourseMobileDto extends PartialType(CreateCateCourseMobileDto) {}
