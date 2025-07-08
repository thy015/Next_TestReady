import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(process.env.PORT ?? 4000)
        .then(()=>{
          console.log("Server running on PORT:"+process.env.PORT)
        })
        app.enableCors();
}
bootstrap();
