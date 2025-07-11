import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto.entity';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { CategoriaModule } from '../categoria/categoria.module'; // Importamos CategoriaModule

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), CategoriaModule], // Añadimos CategoriaModule
  providers: [ProductoService],
  controllers: [ProductoController],
  exports: [ProductoService],
})
export class ProductoModule {}