
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentVars } from './config/envs';
import { } from '@nestjs/microservices';
import { RpcCustomExceptionFilter } from './common/exceptions/rcp-custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted :true
      })
    );
    

    app.useGlobalFilters(new RpcCustomExceptionFilter())

  await app.listen(environmentVars.PORT);

  const logger = new Logger ('API-GATEWAYS2');
  logger.log(`Servidor ejecutandose en el puerto ${environmentVars.PORT}`)  
}
bootstrap();