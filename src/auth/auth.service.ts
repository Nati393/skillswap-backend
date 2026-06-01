import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      return null;
    }
    return user;
  }
}