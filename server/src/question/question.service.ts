import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from 'src/part/entities/part.entity';
import { In, Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {

  constructor(

    @InjectRepository(Question)
    private questionRespo: Repository<Question>,

    @InjectRepository(Part)
    private partRespo: Repository<Part>
  ) { }

  private isValidAnswersFormat(answers: any): boolean {
    if (typeof answers === 'string') {
      try {
        let parsed = JSON.parse(answers);
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed);
        }
        return typeof parsed === 'object' &&
          parsed !== null &&
          !Array.isArray(parsed) &&
          Object.keys(parsed).length >= 2;

      } catch (error) {
        return false;
      }
    }

    if (typeof answers === 'object' && answers !== null && !Array.isArray(answers)) {
      return Object.keys(answers).length >= 2;
    }

    return false;
  }


  async create(createQuestionDto: CreateQuestionDto) {
    const part = await this.partRespo.findOne({ where: { id: createQuestionDto.partId } })

    if (!part) {
      throw new BadRequestException("Không tìm thấy part với id tương ứng !")
    }

    const jsonAnswer = createQuestionDto.answers

    return await this.questionRespo.save({ ...createQuestionDto, part: part });
  }

  async findAll() {
    const questions = await this.questionRespo.find();
    questions.forEach(question => {
      if (typeof question.answers === 'string') {
        try {

          question.answers = JSON.parse(question.answers);
        } catch (error) {
          console.error("Error parsing answers for question ID:", question.id, error);
          question.answers = {};
        }
      }
    });
    return questions;
  }

  async findOne(id: number) {
    const question = await this.questionRespo.findOne({ where: { id } });
    if (!question) {
      throw new BadRequestException("Không tìm thấy câu hỏi với id tương ứng !");
    }
    question.answers = JSON.parse(question.answers);
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    // const { answers } = updateQuestionDto;
    // if (answers && typeof answers === 'string') {
    //   try {
    //     updateQuestionDto.answers = JSON.parse(answers);
    //   } catch (error) {
    //     throw new BadRequestException("Định dạng câu trả lời không hợp lệ!");
    //   }
    // }
    // return await this.questionRespo.update(id, updateQuestionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }

  async createQuestions(questions: CreateQuestionDto[]) {
    if (!questions || questions.length === 0) {
      throw new BadRequestException("Không có câu hỏi nào để tạo!");
    }

    const partIds = [...new Set(questions.map(q => q.partId).filter(id => id))]

    if (partIds.length === 0) {
      throw new BadRequestException("Không có phần thi hợp lệ!");
    }

    const parts = await this.partRespo.find({ where: { id: In(partIds) } });

    if (parts.length === 0)
      throw new BadRequestException("Không tìm thấy phần thi nào !");

    const partMap = new Map(parts.map(part => [part.id, part]));

    const validQuestions = questions
      .filter(q => q.partId && partMap.has(q.partId))
      .map(q => ({
        ...q,
        part: partMap.get(q.partId),
      }));
    let invalidAws: string[] = [];
    questions.forEach(question => {
      if (!this.isValidAnswersFormat(question.answers)) {
        invalidAws.push(question.question);
      }
    });
    if (invalidAws.length > 0) {
      throw new BadRequestException(`Các câu hỏi sau có định dạng câu trả lời không hợp lệ: ${invalidAws.join(", ")}`);
    }
    try {
      const createdQuestions = this.questionRespo.create(validQuestions);
      const savedQuestions = await this.questionRespo.save(createdQuestions);
      return savedQuestions;
    } catch (error) {
      console.log("Lỗi khi tạo câu hỏi:", error);
      throw new BadRequestException("Lỗi khi tạo câu hỏi", error);
    }

  }
}
