import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Cấu hình CORS
  app.enableCors();
  
  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('TestReady API')
    .setDescription('API documentation for TestReady - English Learning Platform')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Nhập JWT token (không cần thêm "Bearer " ở đầu)',
        in: 'header',
      },
      'JWT-auth', // Reference name đơn giản hơn
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Lưu token khi refresh trang
    },
  });
  
  await app.listen(4040);
  console.log('Server is running on http://localhost:4040');
  console.log('API Documentation: http://localhost:4040/api-docs');
}
bootstrap();
