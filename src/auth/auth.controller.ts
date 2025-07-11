import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({ status: 200, description: 'Login exitoso', type: Object })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    if (!loginDto.username || !loginDto.password) {
      throw new BadRequestException('Username y password son requeridos');
    }
    return this.authService.login(loginDto.username, loginDto.password);
  }
}