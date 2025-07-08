import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CourseSectionService } from './course_section.service';
import { CreateCourseSectionDto } from './dto/create-course_section.dto';
import { UpdateCourseSectionDto } from './dto/update-course_section.dto';
import { Admin } from 'typeorm';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Course Section')
@Controller('course/section')
export class CourseSectionController {
  constructor(private readonly courseSectionService: CourseSectionService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo phần khóa học mới',
    description: 'Tạo phần khóa học mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateCourseSectionDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo phần khóa học thành công'
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
  create(@Body(ValidationPipe) createCourseSectionDto: CreateCourseSectionDto) {
    return this.courseSectionService.create(createCourseSectionDto);
  }

  @Get("get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả phần khóa học',
    description: 'Lấy danh sách tất cả phần khóa học trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phần khóa học thành công'
  })
  findAll() {
    return this.courseSectionService.findAll();
  }
  @Get('get/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết phần khóa học',
    description: 'Lấy thông tin chi tiết của phần khóa học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của phần khóa học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin phần khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần khóa học'
  })
  findOne(@Param('id') id: string) {
    return this.courseSectionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin phần khóa học',
    description: 'Cập nhật thông tin phần khóa học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của phần khóa học',
    example: 1
  })
  @ApiBody({ type: UpdateCourseSectionDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật phần khóa học thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần khóa học'
  })
  update(@Param('id') id: string, @Body() updateCourseSectionDto: UpdateCourseSectionDto) {
    return this.courseSectionService.update(+id, updateCourseSectionDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa phần khóa học',
    description: 'Xóa phần khóa học khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của phần khóa học cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa phần khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần khóa học'
  })
  remove(@Param('id') id: string) {
    return this.courseSectionService.remove(+id);
  }
}
