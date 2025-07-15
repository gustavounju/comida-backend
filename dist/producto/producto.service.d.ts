import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { Categoria } from '../categoria/categoria.entity';
export declare class ProductoService {
    private readonly productoRepository;
    private readonly categoriaRepository;
    private readonly directoryUploads;
    constructor(productoRepository: Repository<Producto>, categoriaRepository: Repository<Categoria>);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto | null>;
    saveProduct(productName: string, price: number, filename: string, categoryId: number, description?: string): Promise<Producto>;
    updateProductImage(id: number, filename: string): Promise<Producto>;
    delete(id: number): Promise<void>;
}
