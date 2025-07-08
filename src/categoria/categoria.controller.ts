import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  @Post()
  async create(@Body() categoria: Partial<Categoria>): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() categoria: Partial<Categoria>,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, categoria);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.categoriaService.delete(id);
  }
}
