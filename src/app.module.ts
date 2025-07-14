import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductoModule } from './producto/producto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Producto } from './producto/producto.entity';
import { Categoria } from './categoria/categoria.entity';

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
      entities: [Producto, Categoria, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductoModule,
    CategoriaModule,
  ],
  controllers: [],
})
export class AppModule {}