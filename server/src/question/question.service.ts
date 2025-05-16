import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/part/entities/part.entity';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {

  constructor(
    
    @InjectRepository(Question)
    private questionRespo : Repository<Question>,

    @InjectRepository(Part)
    private partRespo: Repository<Part>
  ){}

  async create(createQuestionDto: CreateQuestionDto) {
    const part = await this.partRespo.findOne({where : {id:createQuestionDto.part_id}})
    
    if(!part){
      throw new BadRequestException("Không tìm thấy part với id tương ứng !")
    }

    const jsonAnwser = createQuestionDto.answer

    return await this.questionRespo.save({...createQuestionDto,part:part});
    return "JSON"+jsonAnwser
  }

  async findAll() {
    return await this.questionRespo.find();
  }

  async findOne(id: number) {
    return await this.questionRespo.findOne({where:{id:id}});
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
