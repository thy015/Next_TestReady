import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCourseSectionDto } from './dto/create-course_section.dto';
import { UpdateCourseSectionDto } from './dto/update-course_section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseSection } from './entities/course_section.entity';
import { Course } from 'src/course/entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseSectionService {

  constructor(
    @InjectRepository(CourseSection)
    private courseSectionRepo: Repository<CourseSection>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,


  ) {}

  async create(createCourseSectionDto: CreateCourseSectionDto) {
    const course = await this.courseRepo.findOne({
      where: { id: createCourseSectionDto.course_id },
    });
    if(!course)
      throw new BadRequestException('Không tìm thấy khóa học !');
    const courseSection = this.courseSectionRepo.create({...createCourseSectionDto, course:course});
    return await this.courseSectionRepo.save(courseSection);
  }

  async findAll() {
    return await this.courseSectionRepo.find();
  }

  async findOne(id: number) {
    return await this.courseSectionRepo.findOne({
      where: { id },
    });
  }


  update(id: number, updateCourseSectionDto: UpdateCourseSectionDto) {
    return `This action updates a #${id} courseSection`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseSection`;
  }
}
