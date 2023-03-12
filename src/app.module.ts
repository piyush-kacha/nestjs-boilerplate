// Import required modules
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Import application files

import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/index';

// Import filters
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { BadRequestExceptionFilter } from './filters/bad-request-exception.filter';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import { ValidationExceptionFilter } from './filters/validator-exception.filter';

// Import modules
import { AuthModule } from './modules/auth/auth.module';
import { BotsModule } from './modules/bot/bot.module';
import { UsersModule } from './modules/user/user.module';
import { WorkspacesModule } from './modules/workspace/workspace.module';

@Module({
  imports: [
    // Configure environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration global
      load: [configuration], // Load the environment variables from the configuration file
    }),

    // Configure logging
    LoggerModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule so that it can be injected into the factory function
      inject: [ConfigService], // Inject the ConfigService into the factory function
      useFactory: async (configService: ConfigService) => {
        // Get the required configuration settings from the ConfigService
        const NODE_ENV = configService.get('env');
        const LOG_LEVEL = configService.get('logLevel');
        const CLUSTERING = configService.get('clustering');

        // Return the configuration for the logger
        return AppConfig.getLoggerConfig(LOG_LEVEL, NODE_ENV, CLUSTERING);
      },
    }),

    // Configure mongoose
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import the ConfigModule so that it can be injected into the factory function
      inject: [ConfigService], // Inject the ConfigService into the factory function
      useFactory: async (configService: ConfigService) => ({
        // Get the required configuration settings from the ConfigService
        uri: configService.get('database.uri'),
      }),
    }),
    // Import modules
    UsersModule,
    WorkspacesModule,
    BotsModule,
    AuthModule,
  ],
  controllers: [AppController], // Define the application's controller
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    {
      // Allowing to do validation through DTO
      // Since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
      // their internal exception so that filter can recognize it
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
  ], // Define the application's service
})
export class AppModule {}
