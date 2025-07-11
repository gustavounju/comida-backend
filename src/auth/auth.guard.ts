import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

// Definir la interfaz para el usuario autenticado
interface JwtUser {
  userId: string | number;
  username: string;
  roles: string[];
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const canActivateResult = super.canActivate(context);

    if (typeof canActivateResult === 'boolean') {
      if (!canActivateResult) {
        throw new UnauthorizedException('Token inválido o no proporcionado');
      }
      return this.checkRoles(context);
    }

    return Promise.resolve(canActivateResult).then((result) => {
      if (!result) {
        throw new UnauthorizedException('Token inválido o no proporcionado');
      }
      return this.checkRoles(context);
    });
  }

  private checkRoles(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    if (roles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtUser | undefined;
    if (!user || !user.roles || !Array.isArray(user.roles)) {
      throw new UnauthorizedException('Usuario no tiene roles definidos o inválidos');
    }

    return roles.some((role: string) => user.roles.includes(role));
  }
}