import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { HttpModule } from '@nestjs/axios';
import { Topic } from 'src/topic/entities/topic.entity';
import { AdminGuard } from 'src/guards/admin.guards';
import { RelatedVerb } from 'src/related_verb/entities/related_verb.entity';
import { RelatedWord } from 'src/related_word/entities/related_word.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word,Topic,RelatedVerb,RelatedWord]),
    HttpModule
  ],
  controllers: [WordController],
  providers: [WordService,AdminGuard],
})
export class WordModule {}
