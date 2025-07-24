import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'crea un nuevo usuario en la base de datos' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente',type:User })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @ApiOperation({ summary: 'Trae todos los usuarios que hay en la base de datos'})
  @ApiResponse({status: 200, type:User, isArray: true}) 
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID único del usuario' })
  @ApiResponse({ status: 200, type: User, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Actualiza un usuario existente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID único del usuario' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, type: User, description: 'Usuario actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Elimina un usuario por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID único del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
