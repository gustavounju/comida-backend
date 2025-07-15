import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { Categoria } from '../categoria/categoria.entity';
import * as fs from 'fs/promises'; // Importamos fs.promises para manejar archivos
import { join } from 'path';

@Injectable()
export class ProductoService {
  private readonly directoryUploads =
    process.env.DIRECTORY_UPLOADS || 'uploads';

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Producto | null> {
    return this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async saveProduct(
    productName: string,
    price: number,
    filename: string,
    categoryId: number,
    description?: string,
  ): Promise<Producto> {
    const url = `/uploads/${filename}`;
    const categoria = await this.categoriaRepository.findOneBy({
      id: categoryId,
    });
    if (!categoria) {
      // Rollback: eliminar la imagen si la categoría no existe
      const filePath = join(
        __dirname,
        '..',
        '..',
        this.directoryUploads,
        filename,
      );
      try {
        await fs.access(filePath); // Verifica si el archivo existe
        await fs.unlink(filePath); // Elimina el archivo
        console.log(`Imagen ${filename} eliminada por fallo de categoría`);
      } catch (err) {
        console.log(`No se pudo eliminar ${filename}: ${err.message}`);
      }
      throw new NotFoundException(
        `Categoría con ID ${categoryId} no encontrada`,
      );
    }
    const producto = this.productoRepository.create({
      name: productName,
      price,
      imageFilename: filename,
      imageUrl: url,
      categoryId,
      isAvailable: true,
      description: description || 'Sin descripción',
    });
    try {
      return await this.productoRepository.save(producto);
    } catch (error) {
      // Rollback: eliminar la imagen si falla la inserción
      const filePath = join(
        __dirname,
        '..',
        '..',
        this.directoryUploads,
        filename,
      );
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(`Imagen ${filename} eliminada por fallo de inserción`);
      } catch (err) {
        console.log(`No se pudo eliminar ${filename}: ${err.message}`);
      }
      console.error('Error al guardar el producto:', error);
      throw new Error('Error interno al crear el producto');
    }
  }

  async updateProductImage(id: number, filename: string): Promise<Producto> {
    const producto = await this.productoRepository.findOneBy({ id });
    if (!producto) throw new NotFoundException('Producto no encontrado');
    producto.imageFilename = filename;
    producto.imageUrl = `/uploads/${filename}`;
    return this.productoRepository.save(producto);
  }

  async delete(id: number): Promise<void> {
    const producto = await this.findOne(id);
    if (!producto) throw new NotFoundException('Producto no encontrada');
    // Eliminar la imagen asociada antes de borrar el producto
    if (producto.imageFilename) {
      const filePath = join(
        __dirname,
        '..',
        '..',
        this.directoryUploads,
        producto.imageFilename,
      );
      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        console.log(
          `Imagen ${producto.imageFilename} eliminada al borrar producto`,
        );
      } catch (err) {
        console.log(
          `No se pudo eliminar ${producto.imageFilename}: ${err.message}`,
        );
      }
    }
    await this.productoRepository.delete(id);
  }
}
