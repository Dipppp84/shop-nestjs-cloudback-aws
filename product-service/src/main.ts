import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  /**Validate*/
  app.useGlobalPipes(new ValidationPipe());

  /**Swagger*/
  const config = new DocumentBuilder()
    .setTitle('Shop')
    .setDescription('Backend shop')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(80);
}

bootstrap();
