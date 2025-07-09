import { PedidoService } from './pedido.service';
import { Pedido } from './pedido.entity';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoService);
    findAll(): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    create(productId: number, userId: number): Promise<Pedido>;
    update(id: number, status: string): Promise<Pedido>;
    delete(id: number): Promise<void>;
}
