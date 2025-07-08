import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
export declare class CategoriaService {
    private categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    create(categoria: Partial<Categoria>): Promise<Categoria>;
    update(id: number, categoria: Partial<Categoria>): Promise<Categoria>;
    delete(id: number): Promise<void>;
}
