import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {join} from 'path';

const cookieParser = require('cookie-parser');

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../public'));
  await app.listen(process.env.PORT);
}
bootstrap();
