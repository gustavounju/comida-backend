import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [ProductoService],
  controllers: [ProductoController],
  exports: [ProductoService],
})
export class ProductoModule {}
