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
exports.ProductoController = void 0;
const common_1 = require("@nestjs/common");
const producto_service_1 = require("./producto.service");
const producto_entity_1 = require("./producto.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
let ProductoController = class ProductoController {
    productoService;
    constructor(productoService) {
        this.productoService = productoService;
    }
    async findAll() {
        return this.productoService.findAll();
    }
    async findOne(id) {
        return this.productoService.findOne(id);
    }
    async create(producto, file) {
        return this.productoService.create(producto, file);
    }
    async update(id, producto, file) {
        return this.productoService.update(id, producto, file);
    }
    async delete(id) {
        return this.productoService.delete(id);
    }
};
exports.ProductoController = ProductoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos los productos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de productos exitosa', type: [producto_entity_1.Producto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un producto por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto encontrado', type: producto_entity_1.Producto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo producto con imagen opcional' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto creado', type: producto_entity_1.Producto }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'mozzarella especial' },
                price: { type: 'number', example: 12.5 },
                categoryId: { type: 'number', example: 1 },
                image: { type: 'string', format: 'binary', example: 'imagen.jpg' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            },
        }),
    })),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un producto con imagen opcional' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Producto actualizado', type: producto_entity_1.Producto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string', example: 'mozzarella deluxe' },
                price: { type: 'number', example: 13.5 },
                categoryId: { type: 'number', example: 1 },
                image: { type: 'string', format: 'binary', example: 'nueva_imagen.jpg' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un producto' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Producto eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "delete", null);
exports.ProductoController = ProductoController = __decorate([
    (0, swagger_1.ApiTags)('productos'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [producto_service_1.ProductoService])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map