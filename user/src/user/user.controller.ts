import { Controller, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  // 실제 사례에서 DB 역할을 하는 객체
  private users = [{ userId: 1, name: 'Alice', email: 'alice@example.com' }];

  // gRPC 핸들러 정의
  @GrpcMethod('UserService', 'FindUserById') // proto service 이름, proto rpc 메서드 이름 기재
  findUserById(data: { userId: number }) {
    const user = this.users.find((u) => u.userId === data.userId);
    return user || {};
  }
}
