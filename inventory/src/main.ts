import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    // HTTP 서버 실행
    const app = await NestFactory.create(AppModule);
    await app.listen(30003, () => {
        console.log('HTTP Server is running on http://localhost:30003');
    });

    // Kafka Consumer 설정
    const appKafka = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092']
            },
            consumer: {
                groupId: 'inventory-consumer'
            }
        }
    });
    await appKafka.listen().then(() => {
        console.log('Inventory Server is listening for Kafka messages');
    });
}
bootstrap();
