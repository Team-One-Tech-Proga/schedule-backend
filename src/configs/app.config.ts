import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.APP_PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  loggerLevel: process.env.APP_LOGGER_LEVEL || 'log,error,warn,debug,verbose',
  env: process.env.NODE_ENV || 'production',
}));
