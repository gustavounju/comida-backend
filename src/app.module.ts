import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AdminModule } from './admin/admin.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'tu_contraseña_aquí',
      database: process.env.DB_DATABASE || 'comida_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // Usar con cuidado, solo en desarrollo
    }),
    CategoriaModule,
    ProductoModule,
    UsuarioModule,
    AdminModule,
    PedidoModule,
  ],
})
export class AppModule {}