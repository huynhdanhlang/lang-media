/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { getBotToken } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { graphqlUploadExpress } from 'graphql-upload';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'img-src': ["'self'", 'cdn.jsdelivr.net'],
          'script-src': ["'self'", 'cdn.jsdelivr.net', "'unsafe-inline'"],
        },
      },
    })
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  const bot: Telegraf = app.get(getBotToken());
  bot
    .launch()
    .then(async () => {
      app.use(await bot.webhookCallback(process.env.TELE_WEBHOOK_PATH));
    })
    .catch((error) => {
      console.log(error);
    });
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 })
  );

  const config = new DocumentBuilder()
    .setTitle('Project demo')
    .setDescription('The project API description')
    .setVersion('1.0')
    .addTag('demo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    exposedHeaders: ['ETag'],
  });
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
