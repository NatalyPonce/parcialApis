/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/CreateBookDto.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwtAuth.guard';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'encontrar todos los libros publicados' })
  @ApiResponse({ status: 201, description: 'Tareas encontradas correctamente' })
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAllbooks();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Publicar un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro publicado correctamente' })
  async create(@Body() CreateBookDto: CreateBookDto, @Request() req) {
    const userId = req.user.userId;
    return this.booksService.createBook(CreateBookDto, userId);
  }
}
