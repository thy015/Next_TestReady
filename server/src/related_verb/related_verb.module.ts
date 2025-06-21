import { Module } from '@nestjs/common';
import { RelatedVerbService } from './related_verb.service';
import { RelatedVerbController } from './related_verb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedVerb } from './entities/related_verb.entity';
import { Word } from 'src/word/entities/word.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports: [TypeOrmModule.forFeature([RelatedVerb,Word])],
  controllers: [RelatedVerbController],
  providers: [RelatedVerbService,AdminGuard],
})
export class RelatedVerbModule {}
