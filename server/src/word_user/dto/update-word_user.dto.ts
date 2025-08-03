import { PartialType } from '@nestjs/swagger';
import { CreateWordUserDto } from './create-word_user.dto';

export class UpdateWordUserDto extends PartialType(CreateWordUserDto) {}
