import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ClassSerializerInterceptor} from '@nestjs/common'
import {Reflector} from '@nestjs/core'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
  new ClassSerializerInterceptor(app.get(Reflector))
); // AQUÍ se define 'app'

  // --- CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('Documentación de nuestra API con NestJS y Swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // --------------------------------

  await app.listen(3000);
}
bootstrap();
