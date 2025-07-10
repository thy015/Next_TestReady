import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseMobileDto } from './dto/create-course_mobile.dto';
import { UpdateCourseMobileDto } from './dto/update-course_mobile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CateCourseMobile } from 'src/cate_course_mobile/entities/cate_course_mobile.entity';
import { Repository } from 'typeorm';
import { CourseMobile } from './entities/course_mobile.entity';

@Injectable()
export class CourseMobileService {

   constructor(
      @InjectRepository(CateCourseMobile)
      private cateCourseMB: Repository<CateCourseMobile>,
  
      @InjectRepository(CourseMobile)
      private courseMobile: Repository<CourseMobile>,
    ) { }

 async create(createCourseMobileDto: CreateCourseMobileDto) {
    const cateCourseMobile = await this.cateCourseMB.findOne({
      where: { id: createCourseMobileDto.category_id },
    });

    if(!cateCourseMobile) 
      throw new BadRequestException("Không tìm thấy danh mục khóa học")
    const newCourseMobile = this.courseMobile.create({
      ...createCourseMobileDto,
      cateCourseMobile: cateCourseMobile,
    });
    return this.courseMobile.save(newCourseMobile);
  }

  async findAll() {
    return this.courseMobile.find();
  }

  async findOne(id: number) {
    return this.courseMobile.findOne({ where: { id } });
  }

  update(id: number, updateCourseMobileDto: UpdateCourseMobileDto) {
    return `This action updates a #${id} courseMobile`;
  }

  remove(id: number) {
    return `This action removes a #${id} courseMobile`;
  }
}
