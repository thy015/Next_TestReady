import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryCourseDto } from './create-category_course.dto';

export class UpdateCategoryCourseDto extends PartialType(CreateCategoryCourseDto) {}
