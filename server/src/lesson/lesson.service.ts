import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { CourseSection } from 'src/course_section/entities/course_section.entity';

@Injectable()
export class LessonService {

  constructor(
    @InjectRepository(Lesson)
    private lessonRepo : Repository<Lesson>,
    @InjectRepository(CourseSection)
    private courseSectionRepo : Repository<CourseSection>,
  ) {}


 async create(createLessonDto: CreateLessonDto) {
    const courseSection = await this.courseSectionRepo.findOneBy({ id: createLessonDto.course_section_id }); 

    if(!courseSection)
      throw new BadRequestException("Không tìm thấy phần học !")
    const lesson = this.lessonRepo.create({...createLessonDto, courseSection});

    return await this.lessonRepo.save(lesson);
  }

  async findAll() {
    const lessons = await this.lessonRepo.find();

    if (lessons.length === 0) {
      throw new BadRequestException("Không tìm thấy bài nào !");
    }
    return lessons;
  }
  async findOne(id: number) {
    const lesson = await this.lessonRepo.findOneBy({ id });
    if (!lesson) {
      throw new BadRequestException("Không tìm thấy bài học !");
    }
    return lesson;
  }

  async findByCourseSectionId(courseSectionId: number) {
    const lessons = await this.lessonRepo.find({
      where: { courseSection: { id: courseSectionId } },
    });
    if (lessons.length === 0) {
      throw new BadRequestException("Không tìm thấy bài học nào trong phần học này !");
    } 
    return lessons
  }

 async update(id: number, updateLessonDto: UpdateLessonDto) {
    return await this.lessonRepo.update(id, updateLessonDto);
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
