import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { NewspaperService } from './newspaper.service';
import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import { UpdateNewspaperDto } from './dto/update-newspaper.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Newspaper')
@Controller('newspaper')
export class NewspaperController {
  constructor(private readonly newspaperService: NewspaperService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo bài báo mới',
    description: 'Tạo bài báo mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateNewspaperDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo bài báo thành công'
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
  create(@Body(ValidationPipe) createNewspaperDto: CreateNewspaperDto) {
    return this.newspaperService.create(createNewspaperDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả bài báo',
    description: 'Lấy danh sách tất cả bài báo trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài báo thành công'
  })
  findAll() {
    return this.newspaperService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết bài báo',
    description: 'Lấy thông tin chi tiết của bài báo theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài báo',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin bài báo thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài báo'
  })
  findOne(@Param('id') id: string) {
    return this.newspaperService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin bài báo',
    description: 'Cập nhật thông tin bài báo theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài báo',
    example: 1
  })
  @ApiBody({ type: UpdateNewspaperDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật bài báo thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài báo'
  })
  update(@Param('id') id: string, @Body() updateNewspaperDto: UpdateNewspaperDto) {
    return this.newspaperService.update(+id, updateNewspaperDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa bài báo',
    description: 'Xóa bài báo khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của bài báo cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa bài báo thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy bài báo'
  })
  remove(@Param('id') id: string) {
    return this.newspaperService.remove(+id);
  }
}
