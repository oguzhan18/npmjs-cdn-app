import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('CDN Hubs API')
    .setDescription(
      'CDN Hubs is a robust and flexible service designed to fetch and serve JavaScript files from various package managers like npm, yarn, and pnpm. The project aims to simplify the process of accessing and delivering JavaScript files by providing a centralized CDN-like service. By leveraging the power of NestJS, CDN Hubs ensures high performance, scalability, and ease of use.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/swagger-ui', express.static(join(__dirname, '..', 'public')));
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Slm cnm',
    customfavIcon: 'https://avatars.githubusercontent.com/u/54273323?v=4',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });
  await app.listen(3000);
}

bootstrap();
