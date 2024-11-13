import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [
        ClientsModule.register([
            // gRPC 클라이언트 설정. Order 서버가 User 서버로 gRPC 요청을 보낼 수 있게됨
            {
                name: 'USER_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'user',
                    protoPath: join(__dirname, '../../protos/user.proto'),
                    url: 'localhost:50001',
                    loader: {
                        keepCase: true,
                        longs: String,
                        enums: String,
                        defaults: true,
                        oneofs: true
                    }
                }
            },
            // Kafka 클라이언트 설정.
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'order',
                        brokers: ['localhost:9092'] // Kafka 브로커 설정
                    },
                    consumer: {
                        groupId: 'order-consumer' // Consumer 그룹 ID
                    }
                }
            }
        ])
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
