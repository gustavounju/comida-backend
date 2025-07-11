import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './auth.guard'; // Asegúrate de que la ruta sea correcta
import { JwtStrategy } from './jwt.strategy';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'tu_secreto_jwt', // Cambia por un valor seguro
      signOptions: { expiresIn: '1h' },
    }),
    AdminModule,
  ],
  providers: [AuthService, JwtAuthGuard, JwtStrategy],
  exports: [AuthService, JwtModule, JwtAuthGuard],
})
export class AuthModule {}