import { PartialType } from '@nestjs/swagger';
import { CreateRelatedWordDto } from './create-related_word.dto';

export class UpdateRelatedWordDto extends PartialType(CreateRelatedWordDto) {}
