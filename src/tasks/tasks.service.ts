import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
      @InjectRepository(Task)
  private readonly taskRepository: Repository<Task>, // nota el tipo Repository<Task>
) {}
  
  
    async create(createTaskDto: CreateTaskDto, user:User) {
      const newObject = {
        ...createTaskDto,
        user: user
      }
    const task = this.taskRepository.create(newObject)
    const save = await this.taskRepository.save(task)
    return save;
  }

   findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const search = await this.taskRepository.findOneBy({id})
    if(!search){
      throw new NotFoundException(`Tarea con el ID: ${id} no encontrada`)
    }
    return search ;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const search = await this.taskRepository.findOneBy({id})
    if(!search){
      throw new NotFoundException(`La tarea con el ID: ${id} no existe `)
    }
    const located = Object.assign(search,updateTaskDto)
    const saved = await this.taskRepository.save(located)
    return saved
    
  }

  async remove(id: number) {
    const search = await this.taskRepository.findOneBy({id})
    if(!search){
      throw new NotFoundException(`La tarea con el ID: ${id} no existe `)
    }
     await this.taskRepository.remove(search)
     return {message: `Tarea con ID : ${id} Eliminada`}
  }
}
