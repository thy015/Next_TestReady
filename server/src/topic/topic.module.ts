import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Word } from 'src/word/entities/word.entity';
import { CourseMobile } from 'src/course_mobile/entities/course_mobile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic,Word,CourseMobile])], // Add your Topic entity here
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
