import { Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
export declare class CategoriaService {
    private categoriaRepository;
    constructor(categoriaRepository: Repository<Categoria>);
    findAll(): Promise<Categoria[]>;
}
