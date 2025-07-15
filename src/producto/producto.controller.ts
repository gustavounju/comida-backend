import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { extname } from 'path';
import { Request } from 'express';
import { Express } from 'express';
import { join } from 'path';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('productos')
@Controller('products')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos exitosa',
    type: [Producto],
  })
  async findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    type: Producto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productoService.findOne(id);
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto con imagen opcional' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        productName: { type: 'string', example: 'mozzarella especial' },
        price: { type: 'number', example: 12.5 },
        categoryId: { type: 'number', example: 1 },
        description: {
          type: 'string',
          example: 'Descripción del producto',
          nullable: true,
        }, // Añadido
        image: { type: 'string', format: 'binary', example: 'imagen.jpg' },
      },
      required: ['productName', 'price', 'categoryId'], // description es opcional
    },
  })
  @ApiResponse({ status: 201, description: 'Producto creado', type: Producto })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
  @ApiResponse({
    status: 500,
    description: 'Error interno al crear el producto',
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          console.log(
            'Destino calculado:',
            join(__dirname, '../../uploads', filename),
          ); // Depuración
          cb(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body(new ValidationPipe({ transform: true })) body: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Producto> {
    if (file) {
      console.log(
        'Archivo recibido:',
        file.originalname,
        'guardado como:',
        file.filename,
        'tamaño:',
        file.size,
        'buffer:',
        file.buffer ? 'presente' : 'ausente',
      );
    } else {
      console.log('No se recibió archivo');
    }
    return this.productoService.saveProduct(
      body.productName,
      body.price,
      file?.filename || '',
      body.categoryId,
      body.description,
    );
  }

  @Put(':id/image')
  @ApiOperation({ summary: 'Actualizar imagen del producto' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' },
      },
      required: ['image'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen actualizada',
    type: Producto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req: Request, file: Express.Multer.File, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `product-${uniqueSuffix}${ext}`;
          console.log(
            'Destino calculado:',
            join(__dirname, '../../uploads', filename),
          ); // Depuración
          cb(null, filename);
        },
      }),
    }),
  )
  async updateImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productoService.updateProductImage(id, file.filename);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productoService.delete(id);
  }
}
