import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { TestCollection } from 'src/test_collection/entities/test_collection.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports:[TypeOrmModule.forFeature([Test,TestCollection])],
  controllers: [TestController],
  providers: [TestService,AdminGuard],
})
export class TestModule {}
