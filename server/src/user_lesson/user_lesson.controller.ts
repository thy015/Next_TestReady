import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserLessonService } from './user_lesson.service';
import { CreateUserLessonDto } from './dto/create-user_lesson.dto';
import { UpdateUserLessonDto } from './dto/update-user_lesson.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@ApiTags('User Lesson')
@Controller('user-lesson')
@UseGuards(JwtAuthGuard)
export class UserLessonController {
  constructor(private readonly userLessonService: UserLessonService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Tạo tiến độ học bài mới',
    description: 'Tạo hoặc cập nhật tiến độ học bài của người dùng'
  })
  @ApiBody({ type: CreateUserLessonDto })
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiResponse({
    status: 201,
    description: 'Tạo tiến độ học bài thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  create(@Req() req, @Body(ValidationPipe) createUserLessonDto: CreateUserLessonDto) {
    return this.userLessonService.create(createUserLessonDto, req.user.id);
  }

  @Get("get-user-by-lesson/:lesson_id")
  @ApiOperation({ 
    summary: 'Lấy danh sách người dùng theo bài học',
    description: 'Lấy danh sách tất cả người dùng đã học bài học cụ thể'
  })
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiParam({ 
    name: 'lesson_id', 
    type: 'number',
    description: 'ID của bài học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách người dùng thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Không tìm thấy bài học'
  })
  getUserByLesson(@Param("lesson_id") id_lesson: number) {
    return this.userLessonService.getUserByIdLesson(id_lesson);
  }

  @Get('get-lesson-by-user')
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Lấy danh sách bài học của người dùng',
    description: 'Lấy danh sách tất cả bài học mà người dùng hiện tại đã học'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách bài học thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  getLessonByUser(@Req() req) {
    return this.userLessonService.getLessonByIdUser(req.user.id);
  }

  @Get("get-progress/:lesson_id")
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Lấy tiến độ học bài',
    description: 'Lấy tiến độ học bài cụ thể của người dùng hiện tại'
  })
  @ApiParam({ 
    name: 'lesson_id', 
    type: 'number',
    description: 'ID của bài học',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy tiến độ học bài thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy tiến độ học bài'
  })
  getProgress(@Param("lesson_id") id_lesson: number, @Req() req) {
    return this.userLessonService.getProgressByIdLesson(id_lesson, req.user.id);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Lấy tất cả tiến độ học bài',
    description: 'Lấy danh sách tất cả tiến độ học bài của tất cả người dùng'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách tiến độ học bài thành công'
  })
  findAll() {
    return this.userLessonService.findAll();
  }

  @Patch('update-progress')
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Cập nhật tiến độ học bài',
    description: 'Cập nhật tiến độ học bài của người dùng hiện tại'
  })
  @ApiBody({ type: UpdateUserLessonDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật tiến độ học bài thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy tiến độ học bài'
  })
  update(@Body() updateUserLessonDto: UpdateUserLessonDto, @Req() req) {
    return this.userLessonService.update(req.user.id, updateUserLessonDto);
  }

  @Delete(':id')
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Xóa tiến độ học bài',
    description: 'Xóa tiến độ học bài theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của tiến độ học bài',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa tiến độ học bài thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy tiến độ học bài'
  })
  remove(@Param('id') id: string) {
    return this.userLessonService.remove(+id);
  }
}
