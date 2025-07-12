
import { BadGatewayException, Controller, Get, Inject, Param, ParseIntPipe, Post , Body, Patch, Delete, BadRequestException} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import {UserCreateDTO } from './dto/user.create.dto';
import { UserUpdateDTO } from './dto/user.update.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('USERS-MS') private readonly usersClient: ClientProxy) {}

  @Get()
  getAll() {
    return this.usersClient.send({cmd: 'users.findAll'}, {})
      .pipe( 
        catchError (err => { throw new BadGatewayException(err) }) 
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return  this.usersClient.send({cmd: 'users.findOne'} , {id})
      .pipe( catchError(err => { throw new BadRequestException(err)} ));
     
  }
 
  @Post()
  create(@Body() dto: UserCreateDTO) {
    return  this.usersClient.send({ cmd: 'users.create' }, dto)
    .pipe( catchError(err => { throw new BadRequestException(err)} ));
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDTO
  ) {
    return  this.usersClient.send({ cmd: 'users.update' }, { ...dto , id})
    .pipe( catchError(err => { throw new BadRequestException(err)} ));
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return  this.usersClient.send({ cmd: 'users.delete' }, {id})
    .pipe( catchError(err => { throw new BadRequestException(err)} ));
  }


}
