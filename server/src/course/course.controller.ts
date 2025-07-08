import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo khóa học mới',
    description: 'Tạo khóa học mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo khóa học thành công'
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
  create(@Body(ValidationPipe) createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get("get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả khóa học',
    description: 'Lấy danh sách tất cả khóa học trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách khóa học thành công'
  })
  findAll() {
    return this.courseService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết khóa học',
    description: 'Lấy thông tin chi tiết của khóa học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của khóa học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy khóa học'
  })
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin khóa học',
    description: 'Cập nhật thông tin khóa học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của khóa học',
    example: 1
  })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật khóa học thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy khóa học'
  })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa khóa học',
    description: 'Xóa khóa học khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của khóa học cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy khóa học'
  })
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
