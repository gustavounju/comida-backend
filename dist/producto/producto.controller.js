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
const path_2 = require("path");
const create_product_dto_1 = require("./dto/create-product.dto");
let ProductoController = class ProductoController {
    productoService;
    constructor(productoService) {
        this.productoService = productoService;
    }
    async findAll() {
        return this.productoService.findAll();
    }
    async findOne(id) {
        const product = await this.productoService.findOne(id);
        if (!product)
            throw new common_1.NotFoundException('Producto no encontrado');
        return product;
    }
    async create(body, file) {
        if (file) {
            console.log('Archivo recibido:', file.originalname, 'guardado como:', file.filename, 'tamaño:', file.size, 'buffer:', file.buffer ? 'presente' : 'ausente');
        }
        else {
            console.log('No se recibió archivo');
        }
        return this.productoService.saveProduct(body.productName, body.price, file?.filename || '', body.categoryId, body.description);
    }
    async updateImage(id, file) {
        return this.productoService.updateProductImage(id, file.filename);
    }
    async delete(id) {
        await this.productoService.delete(id);
    }
};
exports.ProductoController = ProductoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los productos' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de productos exitosa',
        type: [producto_entity_1.Producto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener un producto por ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID del producto' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Producto encontrado',
        type: producto_entity_1.Producto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo producto con imagen opcional' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                productName: { type: 'string', example: 'mozzarella especial' },
                price: { type: 'number', example: 12.5 },
                categoryId: { type: 'number', example: 1 },
                description: {
                    type: 'string',
                    example: 'Descripción del producto',
                    nullable: true,
                },
                image: { type: 'string', format: 'binary', example: 'imagen.jpg' },
            },
            required: ['productName', 'price', 'categoryId'],
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Producto creado', type: producto_entity_1.Producto }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error interno al crear el producto',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `product-${uniqueSuffix}${ext}`;
                console.log('Destino calculado:', (0, path_2.join)(__dirname, '../../uploads', filename));
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id/image'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar imagen del producto' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: { type: 'string', format: 'binary' },
            },
            required: ['image'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Imagen actualizada',
        type: producto_entity_1.Producto,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Producto no encontrado' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                const filename = `product-${uniqueSuffix}${ext}`;
                console.log('Destino calculado:', (0, path_2.join)(__dirname, '../../uploads', filename));
                cb(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "updateImage", null);
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
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [producto_service_1.ProductoService])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map