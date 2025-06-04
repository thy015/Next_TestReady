import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { CategoryCourse } from 'src/category_course/entities/category_course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) 
    private courseRepo:Repository<Course>,

    @InjectRepository(CategoryCourse)
    private cateCourseRepo:Repository<CategoryCourse> 
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const cateCourse = await this.cateCourseRepo.findOneBy({id:createCourseDto.category_course_id});
    if(!cateCourse)
      throw new BadRequestException("Danh mục khóa học không tồn tại !")
    const course = await this.courseRepo.create({...createCourseDto,categoryCourse:cateCourse});
    return await this.courseRepo.save(course);
  }

  async findAll() {
    return await this.courseRepo.find();
  }

  async findOne(id: number) {
    return await this.courseRepo.findOneBy({id});
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
