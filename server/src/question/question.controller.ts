import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Question')
@Controller('test/part')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post("create-question")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo câu hỏi mới',
    description: 'Tạo câu hỏi mới cho bài test (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo câu hỏi thành công'
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
  create(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get("questions")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả câu hỏi',
    description: 'Lấy danh sách tất cả câu hỏi trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách câu hỏi thành công'
  })
  findAll() {
    return this.questionService.findAll();
  }

  @Get('question/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết câu hỏi',
    description: 'Lấy thông tin chi tiết của câu hỏi theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của câu hỏi',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin câu hỏi thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy câu hỏi'
  })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin câu hỏi',
    description: 'Cập nhật thông tin câu hỏi theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của câu hỏi',
    example: 1
  })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật câu hỏi thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy câu hỏi'
  })
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa câu hỏi',
    description: 'Xóa câu hỏi khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của câu hỏi cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa câu hỏi thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy câu hỏi'
  })
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
