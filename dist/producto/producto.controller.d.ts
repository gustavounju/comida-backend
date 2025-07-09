import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
export declare class ProductoController {
    private readonly productoService;
    constructor(productoService: ProductoService);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto>;
    update(id: number, producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto>;
    delete(id: number): Promise<void>;
}
