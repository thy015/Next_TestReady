import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@ApiTags('Topic')
@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post('create')
  @ApiOperation({ 
    summary: 'Tạo chủ đề mới',
    description: 'Tạo chủ đề từ vựng mới trong hệ thống'
  })
  @ApiBody({ type: CreateTopicDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo chủ đề thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  create(@Body(ValidationPipe) createTopicDto: CreateTopicDto) {
    return this.topicService.create(createTopicDto);
  }

  @Get("get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả chủ đề',
    description: 'Lấy danh sách tất cả chủ đề từ vựng trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách chủ đề thành công'
  })
  findAll() {
    return this.topicService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết chủ đề',
    description: 'Lấy thông tin chi tiết của chủ đề theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của chủ đề',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin chủ đề thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy chủ đề'
  })
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin chủ đề',
    description: 'Cập nhật thông tin chủ đề theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của chủ đề',
    example: 1
  })
  @ApiBody({ type: UpdateTopicDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật chủ đề thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy chủ đề'
  })
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa chủ đề',
    description: 'Xóa chủ đề khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của chủ đề cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa chủ đề thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy chủ đề'
  })
  remove(@Param('id') id: string) {
    return this.topicService.remove(+id);
  }
}
