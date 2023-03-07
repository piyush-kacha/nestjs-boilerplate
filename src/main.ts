// Import external modules
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger as Pino } from 'nestjs-pino';

// Import internal modules
import { AppModule } from './app.module';

// Create a logger for the bootstrap process
const logger = new Logger('bootstrap');

// Define the main function
async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Use the Pino logger for the application
  app.useLogger(app.get(Pino));

  // Get the configuration service from the application
  const configService = app.get(ConfigService);

  // Get the port number from the configuration
  const PORT = configService.get<number>('port');

  // Start the application
  await app.listen(PORT);

  // Log a message to indicate that the application is running
  logger.log(`Application listening on port ${PORT}`);
}

// Call the bootstrap function to start the application
bootstrap();
