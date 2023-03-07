// Import external modules
import * as cluster from 'cluster';
import * as os from 'os';
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

if (process.env.CLUSTERING === 'true') {
  const numCPUs = os.cpus().length;
  if ((cluster as any).isMaster) {
    logger.log(`Master process is running with PID ${process.pid}`);

    // Fork workers for each available CPU
    for (let i = 0; i < numCPUs; i += 1) {
      (cluster as any).fork();
    }

    // Log when a worker process exits
    (cluster as any).on('exit', (worker, code, signal) => {
      logger.debug(`Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`);
    });
  } else {
    // Call the bootstrap function to start the application
    bootstrap();
  }
} else {
  // Call the bootstrap function to start the application
  bootstrap();
}
