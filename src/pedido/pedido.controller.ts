import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async findAll(): Promise<Pedido[]> {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Post()
  async create(@Body('productId') productId: number, @Body('userId') userId: number): Promise<Pedido> {
    return this.pedidoService.create(productId, userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('status') status: string): Promise<Pedido> {
    return this.pedidoService.update(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.pedidoService.delete(id);
  }
}