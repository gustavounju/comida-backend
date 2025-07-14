// import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
// import { PedidoService } from './pedido.service';
// import { Pedido } from './pedido.entity';
//
// @ApiTags('pedidos')
// @Controller('pedidos')
// export class PedidoController {
//   constructor(private readonly pedidoService: PedidoService) {}
//
//   @Get()
//   @ApiOperation({ summary: 'Lista todos los pedidos' })
//   @ApiResponse({ status: 200, description: 'Lista de pedidos exitosa', type: [Pedido] })
//   async findAll(): Promise<Pedido[]> {
//     return this.pedidoService.findAll();
//   }
//
//   @Get(':id')
//   @ApiOperation({ summary: 'Obtiene un pedido por ID' })
//   @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Pedido })
//   @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
//   async findOne(@Param('id') id: number): Promise<Pedido> {
//     return this.pedidoService.findOne(id);
//   }
//
//   @Post()
//   @ApiOperation({ summary: 'Crea un nuevo pedido' })
//   @ApiResponse({ status: 201, description: 'Pedido creado', type: Pedido })
//   @ApiResponse({ status: 400, description: 'Producto o usuario no encontrado' })
//   @ApiBody({ schema: { example: { productId: 1, userId: 1 } } })
//   async create(@Body('productId') productId: number, @Body('userId') userId: number): Promise<Pedido> {
//     return this.pedidoService.create(productId, userId);
//   }
//
//   @Put(':id')
//   @ApiOperation({ summary: 'Actualiza el estado de un pedido' })
//   @ApiResponse({ status: 200, description: 'Pedido actualizado', type: Pedido })
//   @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
//   @ApiBody({ schema: { example: { status: 'pagado' } } })
//   async update(@Param('id') id: number, @Body('status') status: string): Promise<Pedido> {
//     return this.pedidoService.update(id, status);
//   }
//
//   @Delete(':id')
//   @ApiOperation({ summary: 'Elimina un pedido' })
//   @ApiResponse({ status: 204, description: 'Pedido eliminado' })
//   @ApiResponse({ status: 404, description: 'Pedido no encontrado' })
//   async delete(@Param('id') id: number): Promise<void> {
//     return this.pedidoService.delete(id);
//   }
// }