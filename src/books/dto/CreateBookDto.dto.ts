import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    example: '100 años de soledad',
    description: 'nombre del libro a ingresar',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Es un libro sobre 100 años de soledad de un pueblo',
    description: 'Descripción del libro a ingresar',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'Gabriel garcia marques',
    description: 'El autor del libro a ingresar',
  })
  @IsString()
  @IsNotEmpty()
  author: string;
}
