import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { TestCollectionService } from './test_collection.service';
import { CreateTestCollectionDto } from './dto/create-test_collection.dto';
import { UpdateTestCollectionDto } from './dto/update-test_collection.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Test Collection')
@Controller('test')
export class TestCollectionController {
  constructor(private readonly testCollectionService: TestCollectionService) {}

  @Post("create-test-collection")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo bộ sưu tập test mới',
    description: 'Tạo bộ sưu tập test mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateTestCollectionDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo bộ sưu tập test thành công'
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
  create(@Body(ValidationPipe) createTestCollectionDto: CreateTestCollectionDto) {
    return this.testCollectionService.create(createTestCollectionDto);
  }

  @Get("get-all-collection")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả bộ sưu tập test',
    description: 'Lấy danh sách tất cả bộ sưu tập test trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bộ sưu tập test thành công'
  })
  findAll() {
    return this.testCollectionService.findAll();
  }

  @Get('test-collection/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết bộ sưu tập test',
    description: 'Lấy thông tin chi tiết của bộ sưu tập test theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bộ sưu tập test',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bộ sưu tập test thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập test'
  })
  findOne(@Param('id') id: string) {
    return this.testCollectionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin bộ sưu tập test',
    description: 'Cập nhật thông tin bộ sưu tập test theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bộ sưu tập test',
    example: 1
  })
  @ApiBody({ type: UpdateTestCollectionDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bộ sưu tập test thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập test'
  })
  update(@Param('id') id: string, @Body() updateTestCollectionDto: UpdateTestCollectionDto) {
    return this.testCollectionService.update(+id, updateTestCollectionDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa bộ sưu tập test',
    description: 'Xóa bộ sưu tập test khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bộ sưu tập test cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bộ sưu tập test thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bộ sưu tập test'
  })
  remove(@Param('id') id: string) {
    return this.testCollectionService.remove(+id);
  }
}
