import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CategoryCourseService } from './category_course.service';
import { CreateCategoryCourseDto } from './dto/create-category_course.dto';
import { UpdateCategoryCourseDto } from './dto/update-category_course.dto';
import { AdminStrategy } from 'src/auth/strategies/admin.strategy';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Category Course')
@Controller('category-course')
export class CategoryCourseController {
  constructor(private readonly categoryCourseService: CategoryCourseService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo danh mục khóa học mới',
    description: 'Tạo danh mục khóa học mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateCategoryCourseDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo danh mục khóa học thành công'
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
  create(@Body(ValidationPipe) createCategoryCourseDto: CreateCategoryCourseDto) {
    return this.categoryCourseService.create(createCategoryCourseDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả danh mục khóa học',
    description: 'Lấy danh sách tất cả danh mục khóa học trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách danh mục khóa học thành công'
  })
  findAll() {
    return this.categoryCourseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết danh mục khóa học',
    description: 'Lấy thông tin chi tiết của danh mục khóa học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của danh mục khóa học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin danh mục khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy danh mục khóa học'
  })
  findOne(@Param('id') id: string) {
    return this.categoryCourseService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin danh mục khóa học',
    description: 'Cập nhật thông tin danh mục khóa học theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của danh mục khóa học',
    example: 1
  })
  @ApiBody({ type: UpdateCategoryCourseDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật danh mục khóa học thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy danh mục khóa học'
  })
  update(@Param('id') id: string, @Body() updateCategoryCourseDto: UpdateCategoryCourseDto) {
    return this.categoryCourseService.update(+id, updateCategoryCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa danh mục khóa học',
    description: 'Xóa danh mục khóa học khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của danh mục khóa học cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa danh mục khóa học thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy danh mục khóa học'
  })
  remove(@Param('id') id: string) {
    return this.categoryCourseService.remove(+id);
  }
}
