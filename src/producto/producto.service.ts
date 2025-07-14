import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { extname } from 'path';
import { Express } from 'express';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find();
  }

  async findOne(id: number): Promise<Producto> {
    return this.productoRepository.findOneOrFail({ where: { id } });
  }

  async create(producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto> {
    const newProducto = this.productoRepository.create({
      ...producto,
      isAvailable: producto.isAvailable !== undefined ? producto.isAvailable : true,
    });
    if (file) {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      newProducto.imageFilename = filename;
      newProducto.imageUrl = `http://localhost:3000/uploads/${filename}`;
    }
    return this.productoRepository.save(newProducto);
  }

  async update(id: number, producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto> {
    const existingProducto = await this.findOne(id);
    if (file) {
      const filename = `${Date.now()}${extname(file.originalname)}`;
      existingProducto.imageFilename = filename;
      existingProducto.imageUrl = `http://localhost:3000/uploads/${filename}`;
    }
    Object.assign(existingProducto, producto);
    return this.productoRepository.save(existingProducto);
  }

  async delete(id: number): Promise<void> {
    await this.productoRepository.delete(id);
  }
}