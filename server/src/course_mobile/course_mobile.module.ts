import { Module } from '@nestjs/common';
import { CourseMobileService } from './course_mobile.service';
import { CourseMobileController } from './course_mobile.controller';
import { Type } from 'class-transformer';
import { CourseMobile } from './entities/course_mobile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/topic/entities/topic.entity';
import { CateCourseMobile } from 'src/cate_course_mobile/entities/cate_course_mobile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseMobile,Topic,CateCourseMobile])],
  controllers: [CourseMobileController],
  providers: [CourseMobileService],
})
export class CourseMobileModule {}
