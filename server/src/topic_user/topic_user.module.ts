import { Module } from '@nestjs/common';
import { TopicUserService } from './topic_user.service';
import { TopicUserController } from './topic_user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/topic/entities/topic.entity';
import { User } from 'src/user/entities/user.entity';
import { TopicUser } from './entities/topic_user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Topic,User,TopicUser])],
  controllers: [TopicUserController],
  providers: [TopicUserService],
})
export class TopicUserModule {}
