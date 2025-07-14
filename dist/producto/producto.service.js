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
const path_1 = require("path");
let ProductoService = class ProductoService {
    productoRepository;
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async findAll() {
        return this.productoRepository.find();
    }
    async findOne(id) {
        return this.productoRepository.findOneOrFail({ where: { id } });
    }
    async create(producto, file) {
        const newProducto = this.productoRepository.create({
            ...producto,
            isAvailable: producto.isAvailable !== undefined ? producto.isAvailable : true,
        });
        if (file) {
            const filename = `${Date.now()}${(0, path_1.extname)(file.originalname)}`;
            newProducto.imageFilename = filename;
            newProducto.imageUrl = `http://localhost:3000/uploads/${filename}`;
        }
        return this.productoRepository.save(newProducto);
    }
    async update(id, producto, file) {
        const existingProducto = await this.findOne(id);
        if (file) {
            const filename = `${Date.now()}${(0, path_1.extname)(file.originalname)}`;
            existingProducto.imageFilename = filename;
            existingProducto.imageUrl = `http://localhost:3000/uploads/${filename}`;
        }
        Object.assign(existingProducto, producto);
        return this.productoRepository.save(existingProducto);
    }
    async delete(id) {
        await this.productoRepository.delete(id);
    }
};
exports.ProductoService = ProductoService;
exports.ProductoService = ProductoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductoService);
//# sourceMappingURL=producto.service.js.map