/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/CreateBookDto.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllbooks(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['owner'] });
  }

  async createBook(dto: CreateBookDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const newBook = this.booksRepository.create({
      title: dto.title,
      description: dto.description,
      author: dto.author,
      owner: user,
    });
    return this.booksRepository.save(newBook);
  }
}
