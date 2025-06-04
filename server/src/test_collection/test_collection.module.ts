import { Module } from '@nestjs/common';
import { TestCollectionService } from './test_collection.service';
import { TestCollectionController } from './test_collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/test/entities/test.entity';
import { TestCollection } from './entities/test_collection.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports: [TypeOrmModule.forFeature([TestCollection,Test])],
  controllers: [TestCollectionController],
  providers: [TestCollectionService,AdminGuard],
})
export class TestCollectionModule {}
