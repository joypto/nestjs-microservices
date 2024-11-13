# Microservices Architecture Practice with Nestjs

여러 개의 Nestjs 프로젝트를 구성하고, gRPC나 메시지 큐(RabbitMQ, Kafka 등)을 이용해 서비스 간 통신을 설계한다. 이때, 각 서비스의 독립적인 데이터베이스 관리, 서비스 간 통신 설정, 장애 복구 전략 등에 유의하며 개발한다.

## 1단계 : 여러 개의 독립적인 Nestjs 프로젝트를 세팅

- Nestjs 프로젝트 생성 : 독립적인 Nestjs 프로젝트들을 생성한다.
- 독립 데이터베이스 연결 : MySQL에 연결하고 각 서비스가 자신의 스키마를 관리하도록 설정한다

## 2-1단계 : 서비스 간 통신 설정 - gRPC 설정 연습

- NestJS에서는 @nestjs/microservices 패키지를 사용해 gRPC 클라이언트와 서버를 설정할 수 있다. 각 서비스에 gRPC 서버를 생성한다.
- protobuf 파일을 정의하여 서비스 간에 호출할 수 있는 메서드를 규격화한다. 이로서 필요한 엔드포인트를 정의할 수 있다.
- 예제로, Order 프로젝트에서 User 프로젝트의 데이터를 읽어오는 gRPC 통신을 설정했다.

## 2-2단계 : 서비스 간 통신 설정 - Kafka 설정 연습

- Kafka는 서비스 간 비동기 통신에 유용하다.
- Nestjs에서 ClientProxy를 사용해 메시지를 보내고, @MessagePattern() 데코레이터를 활용해 메시지 소비자를 설정한다.
- 예제로, 주문 생성 시 OrderCreated 이벤트를 Order Service에서 Kafka로 전송하고, 이를 Inventory Controller가 구독해 재고를 차감하는 통신을 설정했다. 이를 위해 주문 서버에 Kafka 생산자를 설정, 재고 서버에 Kafka 소비자를 설정하였다.
