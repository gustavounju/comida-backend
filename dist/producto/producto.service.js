"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const producto_entity_1 = require("./producto.entity");
const categoria_entity_1 = require("../categoria/categoria.entity");
const fs = require("fs/promises");
const path_1 = require("path");
let ProductoService = class ProductoService {
    productoRepository;
    categoriaRepository;
    directoryUploads = process.env.DIRECTORY_UPLOADS || 'uploads';
    constructor(productoRepository, categoriaRepository) {
        this.productoRepository = productoRepository;
        this.categoriaRepository = categoriaRepository;
    }
    async findAll() {
        return this.productoRepository.find({ relations: ['categoria'] });
    }
    async findOne(id) {
        return this.productoRepository.findOne({
            where: { id },
            relations: ['categoria'],
        });
    }
    async saveProduct(productName, price, filename, categoryId, description) {
        const url = `/uploads/${filename}`;
        const categoria = await this.categoriaRepository.findOneBy({
            id: categoryId,
        });
        if (!categoria) {
            const filePath = (0, path_1.join)(__dirname, '..', '..', this.directoryUploads, filename);
            try {
                await fs.access(filePath);
                await fs.unlink(filePath);
                console.log(`Imagen ${filename} eliminada por fallo de categoría`);
            }
            catch (err) {
                console.log(`No se pudo eliminar ${filename}: ${err.message}`);
            }
            throw new common_1.NotFoundException(`Categoría con ID ${categoryId} no encontrada`);
        }
        const producto = this.productoRepository.create({
            name: productName,
            price,
            imageFilename: filename,
            imageUrl: url,
            categoryId,
            isAvailable: true,
            description: description || 'Sin descripción',
        });
        try {
            return await this.productoRepository.save(producto);
        }
        catch (error) {
            const filePath = (0, path_1.join)(__dirname, '..', '..', this.directoryUploads, filename);
            try {
                await fs.access(filePath);
                await fs.unlink(filePath);
                console.log(`Imagen ${filename} eliminada por fallo de inserción`);
            }
            catch (err) {
                console.log(`No se pudo eliminar ${filename}: ${err.message}`);
            }
            console.error('Error al guardar el producto:', error);
            throw new Error('Error interno al crear el producto');
        }
    }
    async updateProductImage(id, filename) {
        const producto = await this.productoRepository.findOneBy({ id });
        if (!producto)
            throw new common_1.NotFoundException('Producto no encontrado');
        producto.imageFilename = filename;
        producto.imageUrl = `/uploads/${filename}`;
        return this.productoRepository.save(producto);
    }
    async delete(id) {
        const producto = await this.findOne(id);
        if (!producto)
            throw new common_1.NotFoundException('Producto no encontrada');
        if (producto.imageFilename) {
            const filePath = (0, path_1.join)(__dirname, '..', '..', this.directoryUploads, producto.imageFilename);
            try {
                await fs.access(filePath);
                await fs.unlink(filePath);
                console.log(`Imagen ${producto.imageFilename} eliminada al borrar producto`);
            }
            catch (err) {
                console.log(`No se pudo eliminar ${producto.imageFilename}: ${err.message}`);
            }
        }
        await this.productoRepository.delete(id);
    }
};
exports.ProductoService = ProductoService;
exports.ProductoService = ProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __param(1, (0, typeorm_1.InjectRepository)(categoria_entity_1.Categoria)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductoService);
//# sourceMappingURL=producto.service.js.map