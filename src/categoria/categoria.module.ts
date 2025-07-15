import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
import { Producto } from '../producto/producto.entity'; // Añadido para registrar ProductoRepository

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Producto])], // Añadido Producto para inyectar ProductoRepository
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule], // Exporta el módulo para que otros lo usen
})
export class CategoriaModule {}