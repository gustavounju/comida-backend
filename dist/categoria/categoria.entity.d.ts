import { Producto } from '../producto/producto.entity';
export declare class Categoria {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    productos: Producto[];
}
