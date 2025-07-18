import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Part } from 'src/part/entities/part.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports:[TypeOrmModule.forFeature([Question,Part])],
  controllers: [QuestionController],
  providers: [QuestionService,AdminGuard],
})
export class QuestionModule {}
