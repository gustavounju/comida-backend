import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
