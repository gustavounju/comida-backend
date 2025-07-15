import { CategoriaService } from './categoria.service';
import { Categoria } from './categoria.entity';
export declare class CategoriaController {
    private readonly categoriaService;
    constructor(categoriaService: CategoriaService);
    findAll(): Promise<Categoria[]>;
    findOne(id: number): Promise<Categoria>;
    create(body: {
        name: string;
    }): Promise<Categoria>;
    update(id: number, body: {
        name: string;
    }): Promise<Categoria>;
    delete(id: number): Promise<void>;
}
