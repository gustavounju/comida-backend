import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOneByOrFail({ id });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOneByOrFail({ email });
  }

  async create(usuario: Partial<Usuario>): Promise<Usuario> {
    const newUsuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(newUsuario);
  }

  async update(id: number, usuario: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}