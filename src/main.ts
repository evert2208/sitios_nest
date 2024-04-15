import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: { target: false }, 
    })
  );
  // app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Auth y Sitios API')
    .setDescription('endpoints de sitios en ciudades y autenticacion')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT_LOCAL,()=> {
    Logger.log(`corriendo en puerto ${process.env.PORT_LOCAL}`)
  });
}
bootstrap();
