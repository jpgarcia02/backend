import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}
  
  async create(createUserDto: CreateUserDto) {
    try{
      const salt = await bcrypt.genSalt(10)
      const hashedpass = await bcrypt.hash(createUserDto.password,salt)
      createUserDto.password = hashedpass
       const user= await this.userRepository.create(createUserDto)
       const result = await this.userRepository.save(user)
       return result;
    } catch(error){
      if(error.code === '23505'){
        throw new ConflictException('El email ya está registrado.');

      }
      throw error
    }
    
    
  }

  
  findAll() {
    return  this.userRepository.find();
  }
  
  
  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({id})
    if(!user){
      throw new NotFoundException(`El usuario con el ID: ${id} no existe `)
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const search = await this.userRepository.findOneBy({id})
    if(!search){
      throw new NotFoundException(`El usuario con el ID: ${id} no existe `)
    }
    const located = Object.assign(search,updateUserDto)
    const saved = await this.userRepository.save(located)
    return saved
  }

  async remove(id: number) {
    const search = await this.userRepository.findOneBy({id})
    if(!search){
      throw new NotFoundException(`El usuario con el ID: ${id} no existe `)
    }
     await this.userRepository.remove(search)
     return {message: `Usuario con ID : ${id} Eliminado`}
    
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({email})
    if(!user){
      throw new NotFoundException('Email no encontrado')

    }
    return user 
  
}

async login(loginDto: LoginUserDto): Promise<User> {

  const {email,password} = loginDto;

  const searchEmail = await this.findByEmail(email)
  const comparation = await bcrypt.compare(password,searchEmail.password)

  if(!comparation){
    throw  new UnauthorizedException('Credenciales incorrectas')
  }
  return searchEmail

}
}