import { Module } from '@nestjs/common';
import { CategoryCourseService } from './category_course.service';
import { CategoryCourseController } from './category_course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryCourse } from './entities/category_course.entity';
import { AdminStrategy } from 'src/auth/strategies/admin.strategy';
import { PassportModule } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guards';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryCourse,Course]),
    PassportModule.register({session:false})
  ],
  controllers: [CategoryCourseController],
  providers: [CategoryCourseService,AdminGuard],
})
export class CategoryCourseModule {}
