import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateWordUserDto } from './dto/create-word_user.dto';
import { UpdateWordUserDto } from './dto/update-word_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Word } from 'src/word/entities/word.entity';
import { Repository } from 'typeorm';
import { WordUser } from './entities/word_user.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WordUserService {

  constructor(
    @InjectRepository(Word)
    private wordRepo: Repository<Word>,

    @InjectRepository(WordUser)
    private wordUserRepo: Repository<WordUser>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

async create(createWordUserDto: CreateWordUserDto, idUser: number) {
  const { wordID } = createWordUserDto;

  const user = await this.userRepo.findOne({ where: { id: idUser } });
  if (!user) throw new BadRequestException("Không tìm thấy người dùng");

  const word = await this.wordRepo.findOne({ where: { id: wordID } });
  if (!word) throw new BadRequestException("Không tìm thấy từ vựng!");

  let userWord = await this.wordUserRepo.findOne({
    where: {
      word: { id: wordID },
      user: { id: idUser },
    },
    relations: ['word', 'user'],
  });
  if (!userWord) {
    const userWordCreated = this.wordUserRepo.create({
      word: word,
      user: user,
      state: "Đã học",
    });
    return await this.wordUserRepo.save(userWordCreated);
  }
  switch (userWord.state) {
    case "Đã học":
      userWord.state = "Đã nhớ";
      break;
    case "Đã nhớ":
      userWord.state = "Đã thuộc";
      break;
    case "Đã thuộc":
      return userWord;
  }
  return await this.wordUserRepo.save(userWord);
}


  async findAllWordByUser(idUser: number) {
    const wordUser = await this.wordUserRepo.find({
      where: {
        user: {
          id: idUser
        }
      },
      relations: ["word"]
    })

    return wordUser;
  }

  async changeState(idUser: number, updateQuestionDto: UpdateWordUserDto) {
    const { wordID, state } = updateQuestionDto
    let wordUser = await this.wordUserRepo.findOne({
      where: {
        user: { id: idUser },
        word: { id: wordID }
      }
    })
    if (!wordUser) {
      throw new BadGatewayException("Bạn chưa học từ này")
    }
    wordUser.state = state ?? "Đã thuộc"
    return this.wordUserRepo.save(wordUser)
  }

  findOne(id: number) {
    return `This action returns a #${id} wordUser`;
  }

  update(id: number, updateWordUserDto: UpdateWordUserDto) {
    return `This action updates a #${id} wordUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordUser`;
  }
}
