import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { PartService } from './part.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('test/part')
export class PartController {
  constructor(private readonly partService: PartService) {}

  @Post("create-part")
  create(@Body(ValidationPipe) createPartDto: CreatePartDto) {
    return this.partService.create(createPartDto);
  }

  @Get("all-parts")
  findAll() {
    return this.partService.findAll();
  }

  @Get('get-one/:id')
  findOne(@Param('id') id: string) {
    return this.partService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partService.update(+id, updatePartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partService.remove(+id);
  }
}
