import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    // HTTP 서버 실행
    const app = await NestFactory.create(AppModule);
    await app.listen(30002, () => {
        console.log('HTTP Server is running on http://localhost:30002');
    });
}

bootstrap();
