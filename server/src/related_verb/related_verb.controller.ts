import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { RelatedVerbService } from './related_verb.service';
import { CreateRelatedVerbDto } from './dto/create-related_verb.dto';
import { UpdateRelatedVerbDto } from './dto/update-related_verb.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Related Verb')
@Controller('related-verb')
export class RelatedVerbController {
  constructor(private readonly relatedVerbService: RelatedVerbService) {}

  @Post("create")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo động từ liên quan mới',
    description: 'Tạo động từ liên quan mới (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateRelatedVerbDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo động từ liên quan thành công'
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
  create(@Body(ValidationPipe) createRelatedVerbDto: CreateRelatedVerbDto) {
    return this.relatedVerbService.create(createRelatedVerbDto);
  }

  @Get("get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả động từ liên quan',
    description: 'Lấy danh sách tất cả động từ liên quan trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách động từ liên quan thành công'
  })
  findAll() {
    return this.relatedVerbService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết động từ liên quan',
    description: 'Lấy thông tin chi tiết của động từ liên quan theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của động từ liên quan',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin động từ liên quan thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy động từ liên quan'
  })
  findOne(@Param('id') id: string) {
    return this.relatedVerbService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin động từ liên quan',
    description: 'Cập nhật thông tin động từ liên quan theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của động từ liên quan',
    example: 1
  })
  @ApiBody({ type: UpdateRelatedVerbDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật động từ liên quan thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy động từ liên quan'
  })
  update(@Param('id') id: string, @Body() updateRelatedVerbDto: UpdateRelatedVerbDto) {
    return this.relatedVerbService.update(+id, updateRelatedVerbDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa động từ liên quan',
    description: 'Xóa động từ liên quan khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của động từ liên quan cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa động từ liên quan thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy động từ liên quan'
  })
  remove(@Param('id') id: string) {
    return this.relatedVerbService.remove(+id);
  }
}
