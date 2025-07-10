import { PartialType } from '@nestjs/swagger';
import { CreateTestCollectionDto } from './create-test_collection.dto';

export class UpdateTestCollectionDto extends PartialType(CreateTestCollectionDto) {}
