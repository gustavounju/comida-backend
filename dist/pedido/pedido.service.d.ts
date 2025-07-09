import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
export declare class PedidoService {
    private pedidoRepository;
    private productoService;
    private usuarioService;
    constructor(pedidoRepository: Repository<Pedido>, productoService: ProductoService, usuarioService: UsuarioService);
    findAll(): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    create(productId: number, userId: number): Promise<Pedido>;
    update(id: number, status: string): Promise<Pedido>;
    delete(id: number): Promise<void>;
}
