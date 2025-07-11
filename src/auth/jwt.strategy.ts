// src/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt'; // Para extraer JWT y usar la estrategia
import { PassportStrategy } from '@nestjs/passport'; // Para integrar con NestJS
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Para la inyección y excepciones

// Define la interfaz del usuario que esperas en el payload (puede estar en auth.guard.ts o aquí)
interface JwtPayload {
  sub: number; // ID del usuario (sujeto)
  username: string;
  roles: string[]; // Roles del usuario
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header 'Authorization: Bearer <token>'
      ignoreExpiration: false, // El token debe expirar; no se ignorará la expiración.
      secretOrKey: 'tu_super_secreto_jwt_muy_seguro', // <--- ¡DEBE SER EXACTAMENTE EL MISMO SECRETO QUE EN JwtModule.register!
    });
  }

  // Este método se ejecuta cuando un JWT válido es recibido.
  // 'payload' es el objeto decodificado del JWT.
  async validate(payload: JwtPayload): Promise<any> { // Retornamos 'any' para flexibilidad, pero lo tiparemos mejor luego
    // En un caso real, aquí podrías verificar si el usuario (payload.sub) existe en la DB.
    // Si el usuario no existe o está inactivo, lanzar UnauthorizedException.
    if (!payload.sub || !payload.username) {
      throw new UnauthorizedException('Payload JWT inválido o incompleto');
    }

    // Aseguramos que 'roles' siempre sea un array. Si no viene, por defecto es 'visitor'.
    const roles = Array.isArray(payload.roles) ? payload.roles : ['visitor'];

    // Este objeto se adjuntará a 'request.user' en el controlador
    return { userId: payload.sub, username: payload.username, roles: roles };
  }
}