import { Module } from '@nestjs/common';
import { UserLessonService } from './user_lesson.service';
import { UserLessonController } from './user_lesson.controller';
import { Type } from 'class-transformer';
import { UserLesson } from './entities/user_lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Module({
  imports: [TypeOrmModule.forFeature([UserLesson,Lesson,User])],
  controllers: [UserLessonController],
  providers: [UserLessonService,JwtAuthGuard],
})
export class UserLessonModule {}
