import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  // knows if it's development or production through NODE_ENV
  // NODE_ENV is null by default and config assigns development settings by default
  const serverConfig = config.get('server');

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);

  if(process.env.NODE_ENV === 'development') {
    app.enableCors(); // to connect with the frontend
  }

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();
