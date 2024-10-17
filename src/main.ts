import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // transforms the incomming req to the instance of  DTO class after validation
  }))

  /*
  Swagger Doc
  */
  const config = new DocumentBuilder()
    .setTitle("Nest js Intro Project")
    .setDescription("using nest js to create crud")
    .setTermsOfService("/services")
    .addServer("http://localhost:3000/")
    .setVersion('1.0').build();

  // instantiate document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
