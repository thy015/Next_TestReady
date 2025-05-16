import { PartialType } from '@nestjs/mapped-types';
import { CreatePartResultDto } from './create-part_result.dto';

export class UpdatePartResultDto extends PartialType(CreatePartResultDto) {}
