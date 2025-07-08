import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':id')
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() producto: Partial<Producto>, @UploadedFile() file?: Express.Multer.File): Promise<Producto> {
    return this.productoService.update(id, producto, file);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productoService.delete(id);
  }
}