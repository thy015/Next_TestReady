import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { CourseSectionService } from './course_section.service';
import { CreateCourseSectionDto } from './dto/create-course_section.dto';
import { UpdateCourseSectionDto } from './dto/update-course_section.dto';
import { Admin } from 'typeorm';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('course/section')
export class CourseSectionController {
  constructor(private readonly courseSectionService: CourseSectionService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  create(@Body(ValidationPipe) createCourseSectionDto: CreateCourseSectionDto) {
    return this.courseSectionService.create(createCourseSectionDto);
  }

  @Get("get-all")
  findAll() {
    return this.courseSectionService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.courseSectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseSectionDto: UpdateCourseSectionDto) {
    return this.courseSectionService.update(+id, updateCourseSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseSectionService.remove(+id);
  }
}
