import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías exitosa', type: [Categoria] })
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una categoría por ID' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada', type: Categoria })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creada', type: Categoria })
  @ApiBody({ schema: { example: { name: 'postres' } } })
  async create(@Body() categoria: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría actualizada', type: Categoria })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiBody({ schema: { example: { name: 'postres y bebidas' } } })
  async update(@Param('id') id: number, @Body() categoria: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.update(id, categoria);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una categoría' })
  @ApiResponse({ status: 204, description: 'Categoría eliminada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoriaService.delete(id);
  }
}