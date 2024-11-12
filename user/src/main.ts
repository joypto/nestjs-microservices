import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  // HTTP 서버 실행
  const app = await NestFactory.create(AppModule);
  await app.listen(30001, () => {
    console.log('HTTP Server is running on http://localhost:30001');
  });

  // GRPC 서버 실행
  const appGrpc = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user', // proto package 이름
        protoPath: join(__dirname, '../protos/user.proto'), // proto 파일 경로
        url: 'localhost:50001', // grpc 서버 포트
        loader: {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        },
      },
    },
  );
  await appGrpc.listen().then(() => {
    console.log('GRPC Server is running on grpc://localhost:50001');
  });
}

bootstrap();
