import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Crear tu usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado con exito' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Encontrar todos los usuarios' })
  @ApiResponse({ status: 201, description: 'Usuarios encontrados' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Encontrar un usuario especifico' })
  @ApiResponse({ status: 201, description: 'usuario encontrado con exito' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
