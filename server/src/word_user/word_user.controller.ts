import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { WordUserService } from './word_user.service';
import { CreateWordUserDto } from './dto/create-word_user.dto';
import { UpdateWordUserDto } from './dto/update-word_user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@ApiTags('Word User')
@Controller('word-user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class WordUserController {
  constructor(private readonly wordUserService: WordUserService) { }

  @Post("")
  @ApiOperation({ 
    summary: 'Thêm từ vào danh  sách học của người dùng',
    description: 'Tạo mối quan hệ giữa người dùng và từ vựng để theo dõi tiến độ học'
  })
  @ApiBody({ type: CreateWordUserDto })
  @ApiResponse({
    status: 201,
    description: 'Thêm từ vào danh sách học thành công'
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
    status: 409,
    description: 'Từ đã tồn tại trong danh sách học của người dùng'
  })
  create(@Req() req, @Body(ValidationPipe) createWordUserDto: CreateWordUserDto) {
    return this.wordUserService.create(createWordUserDto, req.user.id);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Lấy danh sách từ vựng của người dùng hiện tại',
    description: 'Lấy tất cả từ vựng mà người dùng đang học với trạng thái học tập'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách từ vựng thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  findAll(@Req() req) {
    return this.wordUserService.findAllWordByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết từ vựng của người dùng',
    description: 'Lấy thông tin chi tiết về mối quan hệ học tập giữa người dùng và từ vựng theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của quan hệ word-user',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin từ vựng thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy quan hệ word-user'
  })
  findOne(@Param('id') id: string) {
    return this.wordUserService.findOne(+id);
  }

  @Patch()
  @ApiOperation({ 
    summary: 'Cập nhật trạng thái học từ vựng',
    description: 'Cập nhật trạng thái học tập của từ vựng (learning, mastered, reviewing, etc.)'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của quan hệ word-user',
    example: 1
  })
  @ApiBody({ type: UpdateWordUserDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật trạng thái học từ vựng thành công'
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
    status: 404,
    description: 'Không tìm thấy quan hệ word-user'
  })
  changeState(@Req() req,@Body() updateWordUserDto: UpdateWordUserDto) {
    return this.wordUserService.changeState(req.user.id, updateWordUserDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa từ vựng khỏi danh sách học',
    description: 'Xóa mối quan hệ giữa người dùng và từ vựng, loại bỏ từ khỏi danh sách học'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của quan hệ word-user cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa từ vựng khỏi danh sách học thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy quan hệ word-user'
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền xóa quan hệ word-user này'
  })
  remove(@Param('id') id: string) {
    return this.wordUserService.remove(+id);
  }
}
