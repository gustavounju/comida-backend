import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CategoriaService } from '../categoria/categoria.service';
export declare class ProductoService {
    private productoRepository;
    private categoriaService;
    constructor(productoRepository: Repository<Producto>, categoriaService: CategoriaService);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(productoData: Partial<Producto>): Promise<Producto>;
    update(id: number, producto: Partial<Producto>, file?: Express.Multer.File): Promise<Producto>;
    delete(id: number): Promise<void>;
}
