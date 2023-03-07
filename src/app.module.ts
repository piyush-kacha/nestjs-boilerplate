// Import required modules
import { ConfigModule, ConfigService } from '@nestjs/config'; // Used to configure environment variables
import { LoggerModule } from 'nestjs-pino'; // Used to configure logging
import { Module } from '@nestjs/common'; // Used to define a NestJS module

// Import application files
import { AppConfig } from './app.config'; // Contains application configuration settings
import { AppController } from './app.controller'; // Defines the application's controller
import { AppService } from './app.service'; // Defines the application's service
import { configuration } from './config/index'; // Contains the configuration for the environment variables

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
  ],
  controllers: [AppController], // Define the application's controller
  providers: [AppService], // Define the application's service
})
export class AppModule {}
