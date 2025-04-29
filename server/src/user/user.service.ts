import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Heart } from './entities/heart.entity';
import { HeartService } from './service/user.heart.service';
import { DiamondService } from './service/user.diamond.service';

@Injectable()
export class UserService {

  constructor(
    private heartService : HeartService,
    private diamondService : DiamondService,

    @InjectRepository(User)
    private user : Repository<User>,

    @InjectRepository(Heart)
    private heartRes: Repository<Heart>,
  ){}
  async create(createUserDto: CreateUserDto) {
    try{
      // kiểm tra người dùng đã tạo chưa 
      const emailExisted = await this.user.findOne({where: {email:createUserDto.email}})
      if(emailExisted){
        throw new ConflictException('Email đã tồn tại!');
      }
  
      const phoneExisted = await this.user.findOne({where: {phone_number:createUserDto.phone_number}})
      if(phoneExisted){
        throw new ConflictException('Số điện thoại đã tồn tại!');
      }

      // tạo bảng tim trước khi tạo bảng user
      const heart = await this.heartService.createAuto()
      
      if(!heart){
        throw new BadRequestException("Tạo bảng heart không thành công!")
      }
      
      const diamond = await this.diamondService.createAuto()
      if(!diamond){
        throw new BadRequestException("Tạo bảng diamond không thành công!")

      }
      return  await this.user.save({...createUserDto,heart,diamond}) 
    }catch(err){
      if(err.driverError?.code === "ER_DUP_ENTRY"){
        throw new ConflictException("Trùng id heart")
      }
      return err
    }
    
  }

  async findAll() {
    const users =await this.user.find({relations:{heart:true}})
    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
