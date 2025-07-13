import { Controller, Post, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductoService } from './producto.service';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@Controller('productos')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // Indica que requiere autenticación JWT
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        stock: { type: 'number' },
        categoryId: { type: 'number' },
        isAvailable: { type: 'boolean', default: true },
      },
      required: ['name', 'price', 'stock', 'categoryId'],
    },
  })
  async create(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('price', ParseIntPipe) price: number,
    @Body('stock', ParseIntPipe) stock: number,
    @Body('categoryId', ParseIntPipe) categoryId: number,
    @Body('isAvailable', ParseIntPipe) isAvailable: boolean = true,
  ) {
    const productoData = { name, description, price, stock, categoryId, isAvailable };
    const producto = await this.productoService.create(productoData);
    return producto;
  }
}