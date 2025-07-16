import { PartialType } from '@nestjs/swagger';
import { CreateCourseSectionDto } from './create-course_section.dto';

export class UpdateCourseSectionDto extends PartialType(CreateCourseSectionDto) {}
