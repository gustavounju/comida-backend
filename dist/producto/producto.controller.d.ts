import { ProductoService } from './producto.service';
export declare class ProductoController {
    private productoService;
    constructor(productoService: ProductoService);
    create(name: string, description: string, price: number, stock: number, categoryId: number, isAvailable?: boolean): Promise<import("./producto.entity").Producto>;
}
