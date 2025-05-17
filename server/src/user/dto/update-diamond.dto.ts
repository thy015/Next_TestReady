import { PartialType } from '@nestjs/mapped-types';
import { CreateHeartDto } from './create-heart.dto';

export class UpdateDiamondDto extends PartialType(CreateHeartDto) {}
