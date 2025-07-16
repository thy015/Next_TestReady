import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, ValidationPipe, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { PartResultService } from './part_result.service';
import { CreatePartResultDto } from './dto/create-part_result.dto';
import { UpdatePartResultDto } from './dto/update-part_result.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@ApiTags('Part Result')
@ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
@UseGuards(JwtAuthGuard)
@Controller('user/test/part')
export class PartResultController {
  constructor(private readonly partResultService: PartResultService) { }

  @Post("save-result")
  @ApiOperation({ 
    summary: 'Lưu kết quả làm bài test part',
    description: 'Lưu kết quả làm bài test part của người dùng hiện tại'
  })
  @ApiBody({ type: CreatePartResultDto })
  @ApiResponse({
    status: 201,
    description: 'Lưu kết quả thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  create(@Req() req, @Body(ValidationPipe) createPartResultDto: CreatePartResultDto) {
    return this.partResultService.saveResult(createPartResultDto, req.user.id);
  }

  @Get("result") 
  @ApiOperation({ 
    summary: 'Lấy tất cả kết quả làm bài của người dùng',
    description: 'Lấy danh sách tất cả kết quả làm bài test part của người dùng hiện tại'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách kết quả thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  getResultByUser(@Req() req) {
    return this.partResultService.getResultPartByIdUser(req.user.id);
  }

  @Get('')
  @ApiOperation({ 
    summary: 'Lấy kết quả làm bài theo part ID',
    description: 'Lấy kết quả làm bài test theo part ID và người dùng hiện tại'
  })
  @ApiQuery({ 
    name: 'part_id', 
    type: 'number',
    description: 'ID của part test',
    example: 1,
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy kết quả làm bài theo part thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Thiếu part_id trong query'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  findAll(@Req() req, @Query("part_id") part_id: number) {
    return this.partResultService.getPartResultByIdPart(part_id, req.user.id);
  }

  @Get('part-result/:id')
  @ApiOperation({ 
    summary: 'Lấy chi tiết kết quả làm bài theo ID',
    description: 'Lấy thông tin chi tiết kết quả làm bài test part theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của kết quả làm bài',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy chi tiết kết quả thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy kết quả làm bài'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  findOne(@Param('id') id: number, @Req() req) {
    return this.partResultService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật kết quả làm bài',
    description: 'Cập nhật thông tin kết quả làm bài test part theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của kết quả làm bài',
    example: 1
  })
  @ApiBody({ type: UpdatePartResultDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật kết quả thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy kết quả làm bài'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  update(@Param('id') id: string, @Body() updatePartResultDto: UpdatePartResultDto) {
    return this.partResultService.update(+id, updatePartResultDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa kết quả làm bài',
    description: 'Xóa kết quả làm bài test part theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của kết quả làm bài cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa kết quả thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy kết quả làm bài'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  remove(@Param('id') id: string) {
    return this.partResultService.remove(+id);
  }
}
