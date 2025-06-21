import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatedWordDto } from './create-related_word.dto';

export class UpdateRelatedWordDto extends PartialType(CreateRelatedWordDto) {}
