import { Module } from '@nestjs/common';
import { PartService } from './part.service';
import { PartController } from './part.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from 'src/test/entities/test.entity';
import { Part } from './entities/part.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Test,Part])],
  controllers: [PartController],
  providers: [PartService],
})
export class PartModule {}
