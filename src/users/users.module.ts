import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environmentVars } from 'src/config/envs';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: 'USERS-MS',
        transport: Transport.TCP,
        options: {
          host: environmentVars.USERS_MS_HOST,
          port: environmentVars.USERS_MS_PORT
        }
      }
    ])
  ]
})
export class UsersModule {}
