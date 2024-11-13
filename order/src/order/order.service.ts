import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

// gRPC 서비스 인터페이스 설정
interface UserService {
    findUserById(data: {
        userId: number;
    }): Observable<{ userId: number; name: string; email: string }>;
}

@Injectable()
export class OrderService {
    private userService: UserService;

    constructor(
        // gRPC Client 설정
        @Inject('USER_PACKAGE') private clientGrpcUser: ClientGrpc, // User서버 gRPC 클라이언트 주입
        @Inject('KAFKA_SERVICE') private clientKafka: ClientProxy // Kafka 클라이언트 주입
    ) {}

    onModuleInit() {
        // gRPC Service 읽어오기
        this.userService = this.clientGrpcUser.getService<UserService>('UserService');
    }

    async getUserById(userId: number) {
        return await lastValueFrom(this.userService.findUserById({ userId }));
    }

    async createOrder(orderDetails: any) {
        // 실제 주문 로직 작성
        console.log('Order created: ', orderDetails);

        // 주문 생성 후 Kafka로 'OrderCreated' 이벤트 전송
        this.clientKafka.emit('order_created', orderDetails);
    }
}
