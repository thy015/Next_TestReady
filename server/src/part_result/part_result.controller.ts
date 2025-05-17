import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, ValidationPipe, Req, Query } from '@nestjs/common';
import { PartResultService } from './part_result.service';
import { CreatePartResultDto } from './dto/create-part_result.dto';
import { UpdatePartResultDto } from './dto/update-part_result.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
@UseGuards(JwtAuthGuard)
@Controller('user/test/part')
export class PartResultController {
  constructor(private readonly partResultService: PartResultService) { }

  @Post("save-result")
  create(@Req() req, @Body(ValidationPipe) createPartResultDto: CreatePartResultDto) {
    return this.partResultService.saveResult(createPartResultDto, req.user.id);
  }

  // lấy tất cả kết quả làm của người dùng theo id
  @Get("result") 
  getResultByUser(@Req() req) {
    return this.partResultService.getResultPartByIdUser(req.user.id);
  }


  // lấy tất cả kết quả làm theo mã part và id người dùng
  @Get('')// có query
  findAll(@Req() req,@Query("part_id")  part_id:number) {
    return this.partResultService.getPartResultByIdPart(part_id,req.user.id);
  }


  // lấy part_result theo id của nó 
  @Get('part-result/:id')
  findOne(@Param('id') id: number,@Req() req) {
    return this.partResultService.findOne(+id,req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartResultDto: UpdatePartResultDto) {
    return this.partResultService.update(+id, updatePartResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partResultService.remove(+id);
  }
}
