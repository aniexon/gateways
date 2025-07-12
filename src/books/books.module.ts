
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environmentVars } from 'src/config/envs';

@Module({
  controllers: [BooksController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKS-MS',
        transport: Transport.TCP,
        options: {
          host: environmentVars.BOOKS_MS_HOST,
          port: environmentVars.BOOKS_MS_PORT
        }
      }
    ])
  ]
})
export class BooksModule {}