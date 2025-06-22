import { Module } from '@nestjs/common';
import { RelatedWordService } from './related_word.service';
import { RelatedWordController } from './related_word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedWord } from './entities/related_word.entity';
import { Word } from 'src/word/entities/word.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelatedWord, Word]), // Import the RelatedWord entity and any other entities it depends on
  ],
  controllers: [RelatedWordController],
  providers: [RelatedWordService,AdminGuard],
})
export class RelatedWordModule {}
