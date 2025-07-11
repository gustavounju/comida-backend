import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminService.findByUsername(username);
    if (!admin || admin.password !== password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const payload = {
      username: admin.username,
      sub: admin.id,
      roles: ['admin'],
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(payload: any): Promise<any> {
    const admin = await this.adminService.findOne(payload.sub);
    if (admin && admin.username === payload.username) {
      return {
        userId: payload.sub,
        username: payload.username,
        roles: payload.roles,
      };
    }
    return null;
  }
}
