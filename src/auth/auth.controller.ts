/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'Registar usuario' })
  @ApiResponse({ status: 201, description: 'Registro con exito' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Logearte con tus credenciales' })
  @ApiResponse({ status: 201, description: 'Ingreso con exito' })
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }
    return this.authService.login(user);
  }
}
