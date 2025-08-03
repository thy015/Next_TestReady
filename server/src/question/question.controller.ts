import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AdminGuard } from 'src/guards/admin.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import Multer from 'multer'
import * as XLSX from 'xlsx';
@ApiTags('Question')
@Controller('test/part')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post("create-question")
  @UseGuards(AdminGuard)
  @ApiBearerAuth("JWT-auth") // Thêm "JWT-auth"
  @ApiOperation({ 
    summary: 'Tạo câu hỏi mới',
    description: 'Tạo câu hỏi mới cho bài test (chỉ dành cho admin)'
  })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({
    status: 201,
    description: 'Tạo câu hỏi thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 401,
    description: 'Chưa xác thực'
  })
  @ApiResponse({
    status: 403,
    description: 'Không có quyền admin'
  })
  create(@Body(ValidationPipe) createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get("questions")
  @ApiOperation({ 
    summary: 'Lấy danh sách tất cả câu hỏi',
    description: 'Lấy danh sách tất cả câu hỏi trong hệ thống'
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy danh sách câu hỏi thành công'
  })
  findAll() {
    return this.questionService.findAll();
  }

  @Get('question/:id')
  @ApiOperation({ 
    summary: 'Lấy thông tin chi tiết câu hỏi',
    description: 'Lấy thông tin chi tiết của câu hỏi theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của câu hỏi',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Lấy thông tin câu hỏi thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy câu hỏi'
  })
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Cập nhật thông tin câu hỏi',
    description: 'Cập nhật thông tin câu hỏi theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của câu hỏi',
    example: 1
  })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật câu hỏi thành công'
  })
  @ApiResponse({
    status: 400,
    description: 'Dữ liệu đầu vào không hợp lệ'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy câu hỏi'
  })
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Xóa câu hỏi',
    description: 'Xóa câu hỏi khỏi hệ thống theo ID'
  })
  @ApiParam({ 
    name: 'id', 
    type: 'number',
    description: 'ID của câu hỏi cần xóa',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Xóa câu hỏi thành công'
  })
  @ApiResponse({
    status: 404,
    description: 'Không tìm thấy câu hỏi'
  })
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }

  @Post('upload-question')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(ValidationPipe) file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: CreateQuestionDto[] = XLSX.utils.sheet_to_json(worksheet);
   
    const data = jsonData.map(item => {
      // if (typeof item.answers === 'string') {
      //     item.answers = JSON.parse(item.answers);
      // }
      if (item.imgSrc && typeof item.imgSrc === 'string') {
        const imgSrcArray = item.imgSrc.split("\r\n")
        item.imgSrc = JSON.stringify(imgSrcArray);
      }
      return item;
    })
    return this.questionService.createQuestions(data)
  }

  @Post('upload-img')
  @UseInterceptors(FileInterceptor('file'))
  uploadImg(@UploadedFile() file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: CreateQuestionDto[] = XLSX.utils.sheet_to_json(worksheet);
    const data = jsonData.map(item => {
      console.log("ID ITEM", item.answers);
      return item
      if (item.imgSrc && typeof item.imgSrc === 'string') {
        const imgSrcArray = item.imgSrc.split("\r\n")
        const imgSrcJson = JSON.stringify(imgSrcArray);

        return {
          ...item,
          imgSrc: imgSrcJson
        }

      }
      return item
    })

    console.log("testdata",JSON.parse("{\"a\":\"A. It was less expensive than most models.\", \"b\":\"It was the largest model available.\", \"c\":\"It was rated very highly.\", \"d\":\"It was the same brand as her other appliances.\"}"))

    return {
      jsonData: data
    }
  }
}