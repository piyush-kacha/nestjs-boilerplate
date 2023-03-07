import { IDatabaseConfig, databaseConfig } from './database.config';
import { IJwtConfig, jwtConfig } from './jwt.config';

export interface IConfig {
  env: string;
  port: number;
  host: string;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
}

export const configuration = (): Partial<IConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3009,
  host: process.env.HOST || '127.0.0.1',
  database: databaseConfig(),
  jwt: jwtConfig(),
});
