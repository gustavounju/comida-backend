import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { extname } from 'path';

@ApiTags('productos')
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos exitosa', type: [Producto] })
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    return this.productoService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Crea un nuevo producto con imagen opcional' })
  @ApiResponse({ status: 201, description: 'Producto creado', type: Producto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'mozzarella especial' },
        price: { type: 'number', example: 12.5 },
        categoryId: { type: 'number', example: 1 },
        image: { type: 'string', format: 'binary', example: 'imagen.jpg' },
      },
    },
  })
  async create(@Body() producto: Partial<Producto>, @UploadedFile() file?: Express.Multer.File): Promise<Producto> {
    return this.productoService.create(producto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'Actualiza un producto con imagen opcional' })
  @ApiResponse({ status: 200, description: 'Producto actualizado', type: Producto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'mozzarella deluxe' },
        price: { type: 'number', example: 13.5 },
        categoryId: { type: 'number', example: 1 },
        image: { type: 'string', format: 'binary', example: 'nueva_imagen.jpg' },
      },
    },
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() producto: Partial<Producto>, @UploadedFile() file?: Express.Multer.File): Promise<Producto> {
    return this.productoService.update(id, producto, file);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productoService.delete(id);
  }
}