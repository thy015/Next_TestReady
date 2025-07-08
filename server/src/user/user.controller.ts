import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create-user")
  @ApiOperation({ 
    summary: 'Tạo người dùng mới',
    description: 'Tạo tài khoản người dùng mới với thông tin cơ bản'
  })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo người dùng thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 409,
    description: 'Email đã tồn tại'
  })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const userCreated = this.userService.create(createUserDto);
    return userCreated;
  }

  @Get("/get-all")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả người dùng',
    description: 'Lấy danh sách tất cả người dùng trong hệ thống (dành cho admin)'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách người dùng thành công'
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền truy cập'
  })
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get('')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: 'Lấy thông tin người dùng hiện tại',
    description: 'Lấy thông tin chi tiết của người dùng đang đăng nhập'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin người dùng thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  findOne(@Req() req) {
    console.log("USER", req.user);
    return req.user;
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin người dùng',
    description: 'Cập nhật thông tin người dùng theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của người dùng',
    example: 1
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin người dùng thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng'
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ 
    summary: 'Xóa người dùng',
    description: 'Xóa người dùng khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của người dùng cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa người dùng thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy người dùng'
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền xóa người dùng này'
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
