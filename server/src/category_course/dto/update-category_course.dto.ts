import { PartialType } from '@nestjs/swagger';
import { CreateCategoryCourseDto } from './create-category_course.dto';

export class UpdateCategoryCourseDto extends PartialType(CreateCategoryCourseDto) {}
