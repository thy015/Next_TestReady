import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { RelatedWordService } from './related_word.service';
import { CreateRelatedWordDto } from './dto/create-related_word.dto';
import { UpdateRelatedWordDto } from './dto/update-related_word.dto';
import { AdminGuard } from 'src/guards/admin.guards';

@Controller('related-word')
export class RelatedWordController {
  constructor(private readonly relatedWordService: RelatedWordService) {}

  @UseGuards(AdminGuard)
  @Post("create")
  create(@Body(ValidationPipe) createRelatedWordDto: CreateRelatedWordDto) {
    return this.relatedWordService.create(createRelatedWordDto);
  }

  @Get("get-all")
  findAll() {
    return this.relatedWordService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.relatedWordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelatedWordDto: UpdateRelatedWordDto) {
    return this.relatedWordService.update(+id, updateRelatedWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relatedWordService.remove(+id);
  }
}
