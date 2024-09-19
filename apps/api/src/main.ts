import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Bananagun Reservation System API')
    .setDescription('API for the Bananagun Reservation System')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Determine the base path based on the environment
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? 'api/openapi' : 'openapi';

  SwaggerModule.setup(basePath, app, document);

  await app.listen(3000);
}
bootstrap();
