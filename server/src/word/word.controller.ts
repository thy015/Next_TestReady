import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { HttpService } from '@nestjs/axios';

@ApiTags('Word')
@Controller('word')
export class WordController {
  constructor(
    private readonly wordService: WordService,
  ) {}

  @Post("create")
  @ApiOperation({ 
    summary: 'Tạo từ vựng mới',
    description: 'Thêm từ vựng mới vào hệ thống với thông tin chi tiết'
  })
  @ApiBody({ type: CreateWordDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo từ vựng thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 409,
    description: 'Từ vựng đã tồn tại'
  })
  create(@Body(ValidationPipe) createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get("get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả từ vựng',
    description: 'Lấy danh sách tất cả từ vựng trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách từ vựng thành công'
  })
  findAll() {
    return this.wordService.findAll();
  }

  @Get('search')
  @ApiOperation({ 
    summary: 'Tìm kiếm từ vựng',
    description: 'Tìm kiếm từ vựng theo từ khóa'
  })
  @ApiQuery({ 
    name: 'word', 
    type: 'string',
    description: 'Từ khóa tìm kiếm',
    example: 'beautiful',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'Tìm kiếm từ vựng thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Thiếu từ khóa tìm kiếm'
  })
  search(@Query('word') query: string) {
    return this.wordService.search(query);
  }

  @Get('get-by-topic/:topicId')
  @ApiOperation({ 
    summary: 'Lấy từ vựng theo chủ đề',
    description: 'Lấy danh sách từ vựng thuộc một chủ đề cụ thể'
  })
  @ApiParam({ 
    name: 'topicId', 
    type: 'number',
    description: 'ID của chủ đề',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách từ vựng theo chủ đề thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy chủ đề'
  })
  findByTopic(@Param('topicId') topicId: string) {
    return this.wordService.findByTopicId(+topicId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết từ vựng',
    description: 'Lấy thông tin chi tiết của một từ vựng theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của từ vựng',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin từ vựng thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy từ vựng'
  })
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin từ vựng',
    description: 'Cập nhật thông tin từ vựng theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của từ vựng',
    example: 1
  })
  @ApiBody({ type: UpdateWordDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật từ vựng thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy từ vựng'
  })
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa từ vựng',
    description: 'Xóa từ vựng khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của từ vựng cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa từ vựng thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy từ vựng'
  })
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
