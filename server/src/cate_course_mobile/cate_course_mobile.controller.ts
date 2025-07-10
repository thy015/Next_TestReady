import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CateCourseMobileService } from './cate_course_mobile.service';
import { CreateCateCourseMobileDto } from './dto/create-cate_course_mobile.dto';
import { UpdateCateCourseMobileDto } from './dto/update-cate_course_mobile.dto';

@Controller('cate-course-mobile')
export class CateCourseMobileController {
  constructor(private readonly cateCourseMobileService: CateCourseMobileService) {}

  @Post()
  create(@Body() createCateCourseMobileDto: CreateCateCourseMobileDto) {
    return this.cateCourseMobileService.create(createCateCourseMobileDto);
  }

  @Get("get-all")
  findAll() {
    return this.cateCourseMobileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cateCourseMobileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCateCourseMobileDto: UpdateCateCourseMobileDto) {
    return this.cateCourseMobileService.update(+id, updateCateCourseMobileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cateCourseMobileService.remove(+id);
  }
}
