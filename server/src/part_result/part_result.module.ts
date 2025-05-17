import { Module } from '@nestjs/common';
import { PartResultService } from './part_result.service';
import { PartResultController } from './part_result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartResult } from './entities/part_result.entity';
import { User } from 'src/user/entities/user.entity';
import { Part } from 'src/part/entities/part.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Module({
  imports:[TypeOrmModule.forFeature([PartResult,User,Part])],
  controllers: [PartResultController],
  providers: [PartResultService,JwtAuthGuard],
})
export class PartResultModule {}
