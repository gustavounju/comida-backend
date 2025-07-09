import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
  ) {}

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({ relations: ['productId', 'userId'] });
  }

  async findOne(id: number): Promise<Pedido> {
    return this.pedidoRepository.findOneOrFail({ where: { id }, relations: ['productId', 'userId'] });
  }

  async create(productId: number, userId: number): Promise<Pedido> {
    const producto = await this.productoService.findOne(productId);
    const usuario = await this.usuarioService.findOne(userId);
    const newPedido = this.pedidoRepository.create({
      productId: productId,
      userId: userId,
      totalAmount: producto.price,
      status: 'pendiente',
    });
    return this.pedidoRepository.save(newPedido);
  }

  async update(id: number, status: string): Promise<Pedido> {
    const existingPedido = await this.findOne(id);
    existingPedido.status = status;
    return this.pedidoRepository.save(existingPedido);
  }

  async delete(id: number): Promise<void> {
    await this.pedidoRepository.delete(id);
  }
}