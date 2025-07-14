import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { ProductoService } from '../producto/producto.service'; // Importa ProductoService
import { UsuarioService } from '../usuario/usuario.service'; // Añade esta importación si existe

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private productoService: ProductoService, // Inyecta ProductoService
    private usuarioService: UsuarioService, // Inyecta UsuarioService si está disponible
  ) {}
}