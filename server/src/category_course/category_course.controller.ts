import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards,Req } from '@nestjs/common';
import { CategoryCourseService } from './category_course.service';
import { CreateCategoryCourseDto } from './dto/create-category_course.dto';
import { UpdateCategoryCourseDto } from './dto/update-category_course.dto';
import { AdminStrategy } from 'src/auth/strategies/admin.strategy';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('category-course')
export class CategoryCourseController {
  constructor(private readonly categoryCourseService: CategoryCourseService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  create(@Body(ValidationPipe) createCategoryCourseDto: CreateCategoryCourseDto) {
    return this.categoryCourseService.create(createCategoryCourseDto);
  }

  @Get()
  findAll() {
    return this.categoryCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryCourseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryCourseDto: UpdateCategoryCourseDto) {
    return this.categoryCourseService.update(+id, updateCategoryCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryCourseService.remove(+id);
  }
}
