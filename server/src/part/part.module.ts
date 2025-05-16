import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/test/entities/test.entity';
import { Part } from './entities/part.entity';
import { Question } from 'src/question/entities/question.entity';
import { PartResult } from 'src/part_result/entities/part_result.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Test,Part,Question,PartResult])],
  controllers: [PartController],
  providers: [PartService],
})
export class PartModule {}
