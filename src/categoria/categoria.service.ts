import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Producto } from '../producto/producto.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>, // Ahora debería inyectarse correctamente
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOneBy({ id });
  }

  async create(name: string): Promise<Categoria> {
    const categoria = this.categoriaRepository.create({ name });
    return this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.findOne(id);
    if (!categoria) throw new NotFoundException('Categoría no encontrada');

    // Verificar productos asociados con una consulta directa
    const productosAsociados = await this.productoRepository.find({
      where: { categoryId: id },
    });

    if (productosAsociados.length > 0) {
      // Construir mensaje con los nombres de los productos asociados
      const nombresProductos = productosAsociados.map(p => p.name).join(', ');
      throw new BadRequestException(`No se puede eliminar la categoría porque tiene productos asociados: ${nombresProductos}`);
    }

    await this.categoriaRepository.delete(id);
  }
}