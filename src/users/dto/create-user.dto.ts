import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'juanito.bananito@esen.edu.sv',
    description: 'correo del user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'contraseña1343',
    description: 'Contraseña del usuario',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Juanito bananito',
    description: 'Nombre del usuario',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
