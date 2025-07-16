import { PartialType } from '@nestjs/swagger';
import { CreatePartResultDto } from './create-part_result.dto';

export class UpdatePartResultDto extends PartialType(CreatePartResultDto) {}
