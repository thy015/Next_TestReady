import { PartialType } from '@nestjs/swagger';
import { CreateCourseMobileDto } from './create-course_mobile.dto';

export class UpdateCourseMobileDto extends PartialType(CreateCourseMobileDto) {}
