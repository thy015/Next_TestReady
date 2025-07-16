import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post("create-test")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo bài test mới',
    description: 'Tạo bài test mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateTestDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo bài test thành công'
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
  create(@Body(ValidationPipe) createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả bài test',
    description: 'Lấy danh sách tất cả bài test trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài test thành công'
  })
  findAll() {
    return this.testService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết bài test',
    description: 'Lấy thông tin chi tiết của bài test theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài test',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bài test thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài test'
  })
  findOne(@Param('id') id: number) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin bài test',
    description: 'Cập nhật thông tin bài test theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài test',
    example: 1
  })
  @ApiBody({ type: UpdateTestDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài test thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài test'
  })
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa bài test',
    description: 'Xóa bài test khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài test cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bài test thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài test'
  })
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
