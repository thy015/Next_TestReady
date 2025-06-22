import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseSectionDto } from './create-course_section.dto';

export class UpdateCourseSectionDto extends PartialType(CreateCourseSectionDto) {}
