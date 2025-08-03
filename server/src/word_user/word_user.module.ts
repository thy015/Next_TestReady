import { Module } from '@nestjs/common';
import { WordUserService } from './word_user.service';
import { WordUserController } from './word_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from 'src/word/entities/word.entity';
import { User } from 'src/user/entities/user.entity';
import { WordUser } from './entities/word_user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Word,User,WordUser])],
  controllers: [WordUserController],
  providers: [WordUserService],
})
export class WordUserModule {}
