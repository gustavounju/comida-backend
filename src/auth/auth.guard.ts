import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const isAdminRoute = this.reflector.get<boolean>('isAdmin', context.getHandler());

    if (isAdminRoute) {
      // Verifica si el usuario es admin (basado en sesión)
      const isAdmin = request.session?.isAdmin;
      if (!isAdmin) {
        return false; // Deniega acceso si no es admin
      }
    } else {
      // Para visitantes, solo verifica si hay una sesión con email
      const email = request.session?.email;
      if (!email && !isAdminRoute) {
        return false; // Deniega acceso si no hay email y no es ruta de admin
      }
    }
    return true; // Permite acceso
  }
}