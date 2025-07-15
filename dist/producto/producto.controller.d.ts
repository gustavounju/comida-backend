import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductoController {
    private readonly productoService;
    constructor(productoService: ProductoService);
    findAll(): Promise<Producto[]>;
    findOne(id: number): Promise<Producto>;
    create(body: CreateProductDto, file?: Express.Multer.File): Promise<Producto>;
    updateImage(id: number, file: Express.Multer.File): Promise<Producto>;
    delete(id: number): Promise<void>;
}
