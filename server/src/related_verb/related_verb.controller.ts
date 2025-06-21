import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { RelatedVerbService } from './related_verb.service';
import { CreateRelatedVerbDto } from './dto/create-related_verb.dto';
import { UpdateRelatedVerbDto } from './dto/update-related_verb.dto';
import { AdminGuard } from 'src/guards/admin.guards';
@Controller('related-verb')
export class RelatedVerbController {
  constructor(private readonly relatedVerbService: RelatedVerbService) {}

  @UseGuards(AdminGuard)
  @Post("create")
  create(@Body(ValidationPipe) createRelatedVerbDto: CreateRelatedVerbDto) {
    return this.relatedVerbService.create(createRelatedVerbDto);
  }

  @Get("get-all")
  findAll() {
    return this.relatedVerbService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.relatedVerbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRelatedVerbDto: UpdateRelatedVerbDto) {
    return this.relatedVerbService.update(+id, updateRelatedVerbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relatedVerbService.remove(+id);
  }
}
