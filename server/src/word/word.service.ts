import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from './entities/word.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Topic } from 'src/topic/entities/topic.entity';

@Injectable()
export class WordService {

  constructor(
    @InjectRepository(Word)
    private readonly wordRepo: Repository<Word>,
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,
    private readonly httpService: HttpService,
  ) { }

  async create(createWordDto: CreateWordDto) {
    const { topic_id } = createWordDto;
    const topic = await this.topicRepo.findOne({
      where: {
        id: topic_id,
      },
    });

    const word = this.wordRepo.create({ ...createWordDto, topics: [topic ?? {}] });
    return await this.wordRepo.save(word);
  }

  async search(query: string) {
    if (!query || query.trim() === '')
      return [];

    const words = await this.wordRepo.find({
      where: {
        word: query,
      },
    })
    if (words.length > 0) {
      return words;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
    try {
      const respone = await this.httpService.axiosRef.get(url);
      return respone.data
    } catch (e) {
      return e;
    }

  }


  async findAll() {
    return await this.wordRepo.find();
  }

  async findOne(id: number) {
    return await this.wordRepo.findOne({
      where: {
        id,
      },
    });
  }

  async findByTopicId(topicId: number) {
    return await this.wordRepo.find({
      where: {
        topics: {
          id: topicId,
        },
      },
      relations: ['topics'],
    });
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
