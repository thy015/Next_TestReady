import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Lesson')
@Controller('course/lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Tạo bài học mới',
    description: 'Tạo bài học mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateLessonDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo bài học thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền admin'
  })
  create(@Body(ValidationPipe) createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get("get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả bài học',
    description: 'Lấy danh sách tất cả bài học trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài học thành công'
  })
  findAll() {
    return this.lessonService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết bài học',
    description: 'Lấy thông tin chi tiết của bài học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bài học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài học'
  })
  findOne(@Param('id') id: string) {
    return this.lessonService.findOne(+id);
  }

  @Get("get-lessson-by-course-section/:courseSectionId")
  @ApiOperation({ 
    summary: 'Lấy bài học theo phần khóa học',
    description: 'Lấy danh sách bài học thuộc một phần khóa học cụ thể'
  })
  @ApiParam({ 
    name: 'courseSectionId', 
    type: 'number',
    description: 'ID của phần khóa học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài học theo phần khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần khóa học'
  })
  findByCourseSectionId(@Param('courseSectionId') courseSectionId: string) {
    return this.lessonService.findByCourseSectionId(+courseSectionId);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin bài học',
    description: 'Cập nhật thông tin bài học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài học',
    example: 1
  })
  @ApiBody({ type: UpdateLessonDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài học thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài học'
  })
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa bài học',
    description: 'Xóa bài học khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài học cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bài học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài học'
  })
  remove(@Param('id') id: string) {
    return this.lessonService.remove(+id);
  }
}
