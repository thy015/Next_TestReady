import { Module } from '@nestjs/common';
import { CourseSectionService } from './course_section.service';
import { CourseSectionController } from './course_section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CourseSection } from './entities/course_section.entity';
import { Course } from 'src/course/entities/course.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseSection,Course]),
    PassportModule.register({ session: false }),
  ],
  controllers: [CourseSectionController],
  providers: [CourseSectionService,AdminGuard],
})
export class CourseSectionModule {}
