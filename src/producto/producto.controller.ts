import { Controller, Post, Body, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price', ParseIntPipe) price: number,
    @Body('stock', ParseIntPipe) stock: number,
    @Body('categoryId', ParseIntPipe) categoryId: number,
    @Body('isAvailable', ParseIntPipe) isAvailable: boolean = true, // Valor por defecto
  ) {
    const productoData = {
      name,
      description,
      price,
      stock,
      categoryId,
      isAvailable,
    };
    const producto = await this.productoService.create(productoData);
    return producto;
  }
}
