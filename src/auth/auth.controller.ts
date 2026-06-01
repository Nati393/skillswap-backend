import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }

    const user = await this.authService.login(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    return { user };
  }
}