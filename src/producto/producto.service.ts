import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CategoriaService } from '../categoria/categoria.service';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Producto[]> {
    console.log('Intentando obtener todos los productos...');
    try {
      const productos = await this.productoRepository.find({
        relations: ['categoria'],
      });
      console.log('Productos encontrados:', productos);
      return productos;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Producto> {
    console.log('Intentando obtener producto con id:', id);
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!producto) {
      console.log('Producto no encontrado con id:', id);
      throw new Error('Producto no encontrado');
    }
    return producto;
  }

  // async create(
  //   producto: Partial<Producto>,
  //   file?: Express.Multer.File,
  // ): Promise<Producto> {
  //   const newProducto = this.productoRepository.create(producto);
  //   if (file) {
  //     newProducto.imageFilename = file.filename;
  //     newProducto.imageUrl = `http://localhost:3000/uploads/${file.filename}`;
  //   }
  //   return this.productoRepository.save(newProducto);
  // }

  async create(productoData: Partial<Producto>) {
    const producto = this.productoRepository.create(productoData);
    return this.productoRepository.save(producto);
  }

  async update(
    id: number,
    producto: Partial<Producto>,
    file?: Express.Multer.File,
  ): Promise<Producto> {
    const existingProducto = await this.findOne(id);
    Object.assign(existingProducto, producto);
    if (file) {
      existingProducto.imageFilename = file.filename;
      existingProducto.imageUrl = `http://localhost:3000/uploads/${file.filename}`;
    }
    return this.productoRepository.save(existingProducto);
  }

  async delete(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
