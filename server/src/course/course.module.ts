import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { PassportModule } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guards';
import { CategoryCourse } from 'src/category_course/entities/category_course.entity';
import { CourseSection } from 'src/course_section/entities/course_section.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course,CategoryCourse,CourseSection]),
    PassportModule.register({ session: false }),
  ],
  controllers: [CourseController],
  providers: [CourseService,AdminGuard],
})
export class CourseModule {}
