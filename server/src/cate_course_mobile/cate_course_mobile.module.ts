import { Module } from '@nestjs/common';
import { CateCourseMobileService } from './cate_course_mobile.service';
import { CateCourseMobileController } from './cate_course_mobile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseMobile } from 'src/course_mobile/entities/course_mobile.entity';
import { CateCourseMobile } from './entities/cate_course_mobile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseMobile,CateCourseMobile])], // Add your CateCourseMobile entity here if needed
  controllers: [CateCourseMobileController],
  providers: [CateCourseMobileService],
})
export class CateCourseMobileModule {}
