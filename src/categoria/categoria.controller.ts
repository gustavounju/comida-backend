import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categories')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías exitosa',
    type: [Categoria],
  })
  async findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría encontrada',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const categoria = await this.categoriaService.findOne(id);
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    return categoria;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Categoría creada',
    type: Categoria,
  })
  async create(@Body() body: { name: string }) {
    return this.categoriaService.create(body.name);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { name: { type: 'string' } },
      required: ['name'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Categoría actualizada',
    type: Categoria,
  })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string },
  ) {
    const categoria = await this.categoriaService.findOne(id);
    if (!categoria) throw new NotFoundException('Categoría no encontrada');
    categoria.name = body.name;
    return this.categoriaService.update(categoria);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la categoría' })
  @ApiResponse({ status: 204, description: 'Categoría eliminada' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.categoriaService.delete(id);
  }
}
