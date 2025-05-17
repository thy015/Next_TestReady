import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuards } from 'src/guards/local.guards';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalGuards)
  login(@Req() req,@Body() authLogin: CreateAuthDto){
    return req.user
  }

  @Get("status")
  @UseGuards(JwtAuthGuard)
  status(@Req() req){
    return req.user
  }
}
