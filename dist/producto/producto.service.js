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
const categoria_service_1 = require("../categoria/categoria.service");
let ProductoService = class ProductoService {
    constructor(productoRepository, categoriaService) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
    }
    async findAll() {
        console.log('Intentando obtener todos los productos...');
        try {
            const productos = await this.productoRepository.find({
                relations: ['categoria'],
            });
            console.log('Productos encontrados:', productos);
            return productos;
        }
        catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }
    async findOne(id) {
        console.log('Intentando obtener producto con id:', id);
        const producto = await this.productoRepository.findOne({
            where: { id },
            relations: ['categoria'],
        });
        if (!producto) {
            console.log('Producto no encontrado con id:', id);
            throw new Error('Producto no encontrado');
        }
        return producto;
    }
    async create(productoData) {
        const producto = this.productoRepository.create(productoData);
        return this.productoRepository.save(producto);
    }
    async update(id, producto, file) {
        const existingProducto = await this.findOne(id);
        Object.assign(existingProducto, producto);
        if (file) {
            existingProducto.imageFilename = file.filename;
            existingProducto.imageUrl = `http://localhost:3000/uploads/${file.filename}`;
        }
        return this.productoRepository.save(existingProducto);
    }
    async delete(id) {
        const producto = await this.findOne(id);
        await this.productoRepository.remove(producto);
    }
};
exports.ProductoService = ProductoService;
exports.ProductoService = ProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categoria_service_1.CategoriaService])
], ProductoService);
//# sourceMappingURL=producto.service.js.map