import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseMobileService } from './course_mobile.service';
import { CreateCourseMobileDto } from './dto/create-course_mobile.dto';
import { UpdateCourseMobileDto } from './dto/update-course_mobile.dto';

@Controller('course-mobile')
export class CourseMobileController {
  constructor(private readonly courseMobileService: CourseMobileService) {}

  @Post()
  create(@Body() createCourseMobileDto: CreateCourseMobileDto) {
    return this.courseMobileService.create(createCourseMobileDto);
  }

  @Get("get-all")
  findAll() {
    return this.courseMobileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseMobileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseMobileDto: UpdateCourseMobileDto) {
    return this.courseMobileService.update(+id, updateCourseMobileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseMobileService.remove(+id);
  }
}
