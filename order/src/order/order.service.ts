import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

interface UserService {
  findUserById(data: {
    userId: number;
  }): Observable<{ userId: number; name: string; email: string }>;
}

@Injectable()
export class OrderService {
  private userService: UserService;
  constructor(@Inject('USER_PACKAGE') private userClientGrpc: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.userClientGrpc.getService<UserService>('UserService');
  }

  async getUserById(userId: number) {
    return await lastValueFrom(this.userService.findUserById({ userId }));
  }
}
