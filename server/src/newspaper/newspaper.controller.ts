import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import { UpdateNewspaperDto } from './dto/update-newspaper.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('newspaper')
export class NewspaperController {
  constructor(private readonly newspaperService: NewspaperService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  create(@Body(ValidationPipe) createNewspaperDto: CreateNewspaperDto) {
    return this.newspaperService.create(createNewspaperDto);
  }

  @Get()
  findAll() {
    return this.newspaperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newspaperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewspaperDto: UpdateNewspaperDto) {
    return this.newspaperService.update(+id, updateNewspaperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newspaperService.remove(+id);
  }
}
