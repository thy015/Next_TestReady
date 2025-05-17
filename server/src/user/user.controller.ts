import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/create-user")
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const userCreated =  this.userService.create(createUserDto);
    return userCreated
  }


  @Get("/get-all")
  async findAll() {
    const users = await this.userService.findAll()
    return users
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req) {
    return req.user
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
