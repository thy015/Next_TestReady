import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('course/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  create(@Body(ValidationPipe) createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get("get-all")
  findAll() {
    return this.lessonService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }


  @Get("get-lessson-by-course-section/:courseSectionId")
  findByCourseSectionId(@Param('courseSectionId') courseSectionId: string) {
    return this.lessonService.findByCourseSectionId(+courseSectionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
