import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
export declare class ProductoService {
    private productoRepository;
    constructor(productoRepository: Repository<Producto>);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto>;
    update(id: number, producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto>;
    delete(id: number): Promise<void>;
}
