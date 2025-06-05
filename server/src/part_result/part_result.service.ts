import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePartResultDto } from './dto/create-part_result.dto';
import { UpdatePartResultDto } from './dto/update-part_result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PartResult } from './entities/part_result.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Part } from 'src/part/entities/part.entity';

@Injectable()
export class PartResultService {

  constructor(
    @InjectRepository(PartResult)
    private partResultRespo: Repository<PartResult>,

    @InjectRepository(User)
    private userReso: Repository<User>,

    @InjectRepository(Part)
    private partRespo: Repository<Part>
  ) { }

  async saveResult(createPartResultDto: CreatePartResultDto, idUser: number) {
    try {
      if (!idUser) throw new BadRequestException("Id người dùng bị mất !")
      const user = await this.userReso.findOne({ where: { id: idUser } })
      if (!user) throw new BadRequestException("Không tìm thấy người dùng !")

      const part = await this.partRespo.findOne({ where: { id: createPartResultDto.part_id } })
      if (!part) throw new BadRequestException("Không tìm thấy Part đã chọn !")

      return await this.partResultRespo.save({ ...createPartResultDto, user: user, part: part })
    } catch (err) {
      throw new InternalServerErrorException(err)
    }

  }

  async getResultPartByIdUser(idUser: number) {
    const user = await this.userReso.findOne({
      where:{ id:idUser},
      relations: {part_results:true}
    })
    const part_results = user?.part_results 
    if(!part_results||part_results?.length <=0){
      throw new BadRequestException("Người dùng chưa làm bất kì bài test nào!")
    }

    return part_results ;
  }

  async getPartResultByIdPart(idPart:number, idUser:number){
    const partResult = await this.partResultRespo.find({
      where: {
        user : {id:idUser},
        part:{id:idPart}
      }
    })
    if(partResult.length <= 0) {
      const part = await this.partRespo.findOne({where :{id:idPart}})
      if(!part) throw new BadRequestException("Part không tồn tại !")
      throw new BadRequestException(`Người dùng chưa làm phần Part ${part?.name}`)
    }
    return  partResult
  }

  async findOne(id: number,user:User) {
    const partResult = await this.partResultRespo.findOne({where:{id}})
    
    if(!partResult) {
      throw new BadRequestException("Không có kết quả làm bài của "+ user.fullname)
    }
    return partResult;
  }

  update(id: number, updatePartResultDto: UpdatePartResultDto) {
    return `This action updates a #${id} partResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} partResult`;
  }
}
