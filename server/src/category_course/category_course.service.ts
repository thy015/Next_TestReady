import { Injectable, UseGuards   } from '@nestjs/common';
import { CreateCategoryCourseDto } from './dto/create-category_course.dto';
import { UpdateCategoryCourseDto } from './dto/update-category_course.dto';
import { CategoryCourse } from './entities/category_course.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminStrategy } from 'src/auth/strategies/admin.strategy';

@Injectable()
export class CategoryCourseService {

  constructor(
    @InjectRepository(CategoryCourse)
    private categoryCourseRepository: Repository<CategoryCourse>,
  ) {}

  async create(createCategoryCourseDto: CreateCategoryCourseDto) {
    const categoryCourse = await this.categoryCourseRepository.create(createCategoryCourseDto);
    return await this.categoryCourseRepository.save(categoryCourse);
  }

  async findAll() {
    return await this.categoryCourseRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryCourseRepository.findOneBy({ id });
  }

  update(id: number, updateCategoryCourseDto: UpdateCategoryCourseDto) {
    return `This action updates a #${id} categoryCourse`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryCourse`;
  }
}
