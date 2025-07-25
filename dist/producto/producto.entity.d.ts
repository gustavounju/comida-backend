import { Categoria } from '../categoria/categoria.entity';
export declare class Producto {
    id: number;
    categoryId: number;
    categoria: Categoria;
    name: string;
    price: number;
    imageFilename: string;
    imageUrl: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
