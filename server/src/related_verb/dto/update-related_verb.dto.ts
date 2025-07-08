import { PartialType } from '@nestjs/swagger';
import { CreateRelatedVerbDto } from './create-related_verb.dto';

export class UpdateRelatedVerbDto extends PartialType(CreateRelatedVerbDto) {}