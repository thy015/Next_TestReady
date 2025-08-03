import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Test Part')
@Controller('test/part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post("create-part")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo phần bài test mới',
    description: 'Tạo phần bài test mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreatePartDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo phần bài test thành công'
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
  create(@Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partService.create(createPartDto);
  }
  
  @Get("all-parts")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả phần bài test',
    description: 'Lấy danh sách tất cả phần bài test trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách phần bài test thành công'
  })
  findAll() {
    return this.partService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết phần bài test',
    description: 'Lấy thông tin chi tiết của phần bài test theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của phần bài test',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin phần bài test thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần bài test'
  })
  findOne(@Param('id') id: string) {
    return this.partService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin phần bài test',
    description: 'Cập nhật thông tin phần bài test theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của phần bài test',
    example: 1
  })
  @ApiBody({ type: UpdatePartDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật phần bài test thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần bài test'
  })
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partService.update(+id, updatePartDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa phần bài test',
    description: 'Xóa phần bài test khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của phần bài test cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa phần bài test thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy phần bài test'
  })
  remove(@Param('id') id: string) {
    return this.partService.remove(+id);
  }
}
