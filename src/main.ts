import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar sesiones
  app.use(
    session({
      secret: '12345', // Cambia esto por un valor seguro
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // 1 hora de duración
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Comida Backend API')
    .setDescription('API para la gestión de una tienda de comidas online')
    .setVersion('1.0')
    .addTag('categorias')
    .addTag('productos')
    .addTag('usuarios')
    .addTag('admins')
    .addTag('pedidos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
