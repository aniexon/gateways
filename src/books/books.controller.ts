
import { BadGatewayException, Controller, Get, Inject, Param, ParseIntPipe, Post , Body, Patch, Delete, BadRequestException} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import {BookCreateDTO } from './dto/book.create.dto';
import { BookUpdateDTO } from './dto/book.update.dto';

@Controller('books')
export class BooksController {
  constructor(@Inject('BOOKS-MS') private readonly usersClient: ClientProxy) {}

  @Get()
  getAll() {
    return this.usersClient.send({cmd: 'books.findAll'}, {})
      .pipe( 
        catchError (err => { throw new BadGatewayException(err) }) 
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return  this.usersClient.send({cmd: 'books.findOne'} , {id})
      .pipe( catchError(err => { throw new BadRequestException(err)} ));
     
  }
 
  @Post()
  create(@Body() dto: BookCreateDTO) {
    return  this.usersClient.send({ cmd: 'books.create' }, dto)
    .pipe( catchError(err => { throw new BadRequestException(err)} ));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BookUpdateDTO
  ) {
    return  this.usersClient.send({ cmd: 'books.update' }, { ...dto , id})
    .pipe( catchError(err => { throw new BadRequestException(err)} ));
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return  this.usersClient.send({ cmd: 'books.delete' }, {id})
    .pipe( catchError(err => { throw new BadRequestException(err)} ));
  }


}
