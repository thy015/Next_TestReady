import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuards } from 'src/guards/local.guards';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalGuards)
  @ApiOperation({ 
    summary: 'Đăng nhập người dùng',
    description: 'Xác thực thông tin đăng nhập và trả về JWT token'
  })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Đăng nhập thành công, trả về thông tin người dùng và token'
  })
  @ApiResponse({
    status: 401,
    description: 'Thông tin đăng nhập không chính xác'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  login(@Req() req, @Body(ValidationPipe) authLogin: CreateAuthDto){
    return req.user
  }

  @Get("status")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ 
    summary: 'Kiểm tra trạng thái đăng nhập',
    description: 'Lấy thông tin người dùng hiện tại từ JWT token'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin người dùng thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Token không hợp lệ hoặc đã hết hạn'
  })
  status(@Req() req){
    return req.user
  }

  @Post("register-admin")
  @ApiOperation({ 
    summary: 'Đăng ký tài khoản admin',
    description: 'Tạo tài khoản admin mới với thông tin đầy đủ'
  })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: 'Đăng ký admin thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 409,
    description: 'Email admin đã tồn tại'
  })
  registerAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto){
    return this.authService.registerAdmin(createAdminDto)
  }

  @Get("admin")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả admin',
    description: 'Lấy danh sách tất cả tài khoản admin trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách admin thành công'
  })
  getAllAdmin(){
    return this.authService.getAllAdmin()
  }

  @Get("verify-admin")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ 
    summary: 'Xác thực quyền admin',
    description: 'Kiểm tra và xác thực quyền admin của người dùng hiện tại'
  })
  @ApiResponse({
    status: 200,
    description: 'Xác thực admin thành công'
  })
  @ApiResponse({
    status: 401,
    description: 'Token không hợp lệ'
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền admin'
  })
  verifyAdmin(@Req() req){
    console.log("VERIFY ADMIN",req.user)
    return req.user
  }
}
