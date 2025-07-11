import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller'; // Añadido
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AdminModule } from './admin/admin.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'tu_contraseña_aquí',
      database: process.env.DB_DATABASE || 'delivery_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    CategoriaModule,
    ProductoModule,
    UsuarioModule,
    AdminModule,
    PedidoModule,
  ],
  controllers: [AuthController], // Añadido
})
export class AppModule {}