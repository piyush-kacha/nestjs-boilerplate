// 
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as Pino } from 'nestjs-pino';

import { AppModule } from './app.module';

const logger = new Logger('bootstrap');
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Pino));
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('port');
  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
