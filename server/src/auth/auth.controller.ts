import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuards } from 'src/guards/local.guards';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalGuards)
  login(@Req() req,@Body(ValidationPipe) authLogin: CreateAuthDto){
    return req.user
  }

  @Get("status")
  @UseGuards(JwtAuthGuard)
  status(@Req() req){
    return req.user
  }

  @Post("register-admin")
  registerAdmin(@Body(ValidationPipe) createAdminDto: CreateAdminDto){
    return this.authService.registerAdmin(createAdminDto)
  }

  @Get("admin")
  getAllAdmin(){
    return this.authService.getAllAdmin()
  }


  @Get("verify-admin")
  @UseGuards(AdminGuard)
  verifyAdmin(@Req() req){
    console.log("VERIFY ADMIN",req.user)
    return req.user
  }
}
