import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    return this.categoriaRepository.findOneByOrFail({ id });
  }

  async create(categoria: Partial<Categoria>): Promise<Categoria> {
    const newCategoria = this.categoriaRepository.create(categoria);
    return this.categoriaRepository.save(newCategoria);
  }

  async update(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    await this.categoriaRepository.update(id, categoria);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}