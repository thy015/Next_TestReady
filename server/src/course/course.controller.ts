import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  create(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get("get-all")
  findAll() {
    return this.courseService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
