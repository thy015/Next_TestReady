import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { CourseSection } from 'src/course_section/entities/course_section.entity';
import { AdminGuard } from 'src/guards/admin.guards';
import { UserLesson } from 'src/user_lesson/entities/user_lesson.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson,CourseSection,UserLesson])],  
  controllers: [LessonController],
  providers: [LessonService,AdminGuard],
})
export class LessonModule {}
