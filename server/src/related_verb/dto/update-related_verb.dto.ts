import { PartialType } from '@nestjs/mapped-types';
import { CreateRelatedVerbDto } from './create-related_verb.dto';

export class UpdateRelatedVerbDto extends PartialType(CreateRelatedVerbDto) {}