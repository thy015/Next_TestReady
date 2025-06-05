import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from './entities/admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRespo : Repository<User>,


    private jwtService: JwtService,
    
    @InjectRepository(Admin)
    private adminRespo : Repository<Admin>,
  ){}

  async comparePassword(passwordInput:string, password:string){
    return await bcrypt.compare(passwordInput,password)
  }

  async validateUser({email,password}:CreateAuthDto){
    const findUser = await this.userRespo.findOne({where:{email:email}})
    if(!findUser){
      const findAdmin = await this.adminRespo.findOne({where:{email:email}})
      if(!findAdmin)
        throw new BadRequestException("Tài khoản không tồn tại !")

      if(await this.comparePassword(password,findAdmin.password)){
        const admin = {
          id:findAdmin.id,
          fullname:findAdmin.fullname,
          email:findAdmin.email,
          role:"admin"
        }
        return { access_token:this.jwtService.sign(admin),user_payload:admin}
      }
      throw new BadRequestException("Mật khẩu không đúng !")
    }
    if(await this.comparePassword(password,findUser.password)){
      const user = {
        id:findUser.id,
        fullname:findUser.fullname,
        email:findUser.email,
        role:"user"
      }

     return { access_token:this.jwtService.sign(user),user_payload:user}
    } 
  }


  async registerAdmin(createAdminDto:CreateAdminDto){
    const {email,password} = createAdminDto
    const findUser = await this.adminRespo.findOne({where:{email:email}})
    if(findUser) 
      throw new BadRequestException("Email admin đang được sử dụng !")
    const hashPassword = await bcrypt.hash(password,12)
    const admin = await this.adminRespo.create({...createAdminDto,password:hashPassword}) 
    return await this.adminRespo.save(admin)
  }

  async getAllAdmin(){
    return await this.adminRespo.find()
  }
}
