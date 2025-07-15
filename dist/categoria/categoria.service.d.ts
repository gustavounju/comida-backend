import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { Producto } from '../producto/producto.entity';
export declare class CategoriaService {
    private readonly categoriaRepository;
    private readonly productoRepository;
    constructor(categoriaRepository: Repository<Categoria>, productoRepository: Repository<Producto>);
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria | null>;
    create(name: string): Promise<Categoria>;
    update(categoria: Categoria): Promise<Categoria>;
    delete(id: number): Promise<void>;
}
