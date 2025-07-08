import { Injectable } from '@nestjs/common';
import { CreateCateCourseMobileDto } from './dto/create-cate_course_mobile.dto';
import { UpdateCateCourseMobileDto } from './dto/update-cate_course_mobile.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CateCourseMobile } from './entities/cate_course_mobile.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';
import { CourseMobile } from 'src/course_mobile/entities/course_mobile.entity';


@Injectable()
export class CateCourseMobileService {

  constructor(
    @InjectRepository(CateCourseMobile)
    private cateCourseMB: Repository<CateCourseMobile>,

    @InjectRepository(CourseMobile)
    private courseMobile: Repository<CourseMobile>,
  ) { }

  async create(createCateCourseMobileDto: CreateCateCourseMobileDto) {
    const newCateCourseMobile = this.cateCourseMB.create(createCateCourseMobileDto);
    return this.cateCourseMB.save(newCateCourseMobile);
  }

  async findAll() {
    return this.cateCourseMB.find();
  }

  async findOne(id: number) {
    return this.cateCourseMB.findOne({
      where:{id}
    });
  }

  update(id: number, updateCateCourseMobileDto: UpdateCateCourseMobileDto) {
    return `This action updates a #${id} cateCourseMobile`;
  }

  remove(id: number) {
    return `This action removes a #${id} cateCourseMobile`;
  }
}
