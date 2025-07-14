import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { ProductoService } from '../producto/producto.service';
import { UsuarioService } from '../usuario/usuario.service';
export declare class PedidoService {
    private pedidoRepository;
    private productoService;
    private usuarioService;
    constructor(pedidoRepository: Repository<Pedido>, productoService: ProductoService, usuarioService: UsuarioService);
}
