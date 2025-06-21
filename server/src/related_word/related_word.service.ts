import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRelatedWordDto } from './dto/create-related_word.dto';
import { UpdateRelatedWordDto } from './dto/update-related_word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RelatedWord } from './entities/related_word.entity';
import { Word } from 'src/word/entities/word.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelatedWordService {

  constructor(
    @InjectRepository(RelatedWord)
    private readonly relatedWordRepo: Repository<RelatedWord>,
    @InjectRepository(Word)
    private readonly wordRepo: Repository<Word>,
  ) {}

  async create(createRelatedWordDto: CreateRelatedWordDto) {
    const { word_id } = createRelatedWordDto;
    if (!word_id) {
      throw new BadRequestException("Không tìm thấy id của từ");
    }
    const word = await this.wordRepo.findOne({
      where: {
        id: word_id,
      },
    }); 
    if (!word) {
      throw new BadRequestException("Không tìm thấy từ tương ứng");
    }
    const relatedWord = this.relatedWordRepo.create({
      ...createRelatedWordDto,
      word: word,
    });
    return await this.relatedWordRepo.save(relatedWord);
  }

  async findAll() {
    return await this.relatedWordRepo.find();
  }

  async findOne(id: number) {
    return await this.relatedWordRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        word: true,
      },
    });
  }

  async update(id: number, updateRelatedWordDto: UpdateRelatedWordDto) {
    await this.relatedWordRepo.update(id, updateRelatedWordDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} relatedWord`;
  }
}
