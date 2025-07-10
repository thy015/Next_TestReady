import { PartialType } from '@nestjs/swagger';
import { CreateUserLessonDto } from './create-user_lesson.dto';

export class UpdateUserLessonDto extends PartialType(CreateUserLessonDto) {}
