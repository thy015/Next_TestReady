import { PartialType } from '@nestjs/mapped-types';
import { CreateTestCollectionDto } from './create-test_collection.dto';

export class UpdateTestCollectionDto extends PartialType(CreateTestCollectionDto) {}
