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
let ProductoController = class ProductoController {
    constructor(productoService) {
        this.productoService = productoService;
    }
    async create(name, description, price, stock, categoryId, isAvailable = true) {
        const productoData = {
            name,
            description,
            price,
            stock,
            categoryId,
            isAvailable,
        };
        const producto = await this.productoService.create(productoData);
        return producto;
    }
};
exports.ProductoController = ProductoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('description')),
    __param(2, (0, common_1.Body)('price', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)('stock', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Body)('categoryId', common_1.ParseIntPipe)),
    __param(5, (0, common_1.Body)('isAvailable', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], ProductoController.prototype, "create", null);
exports.ProductoController = ProductoController = __decorate([
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [producto_service_1.ProductoService])
], ProductoController);
//# sourceMappingURL=producto.controller.js.map