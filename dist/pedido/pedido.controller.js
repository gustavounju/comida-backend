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
exports.PedidoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pedido_service_1 = require("./pedido.service");
const pedido_entity_1 = require("./pedido.entity");
let PedidoController = class PedidoController {
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }
    async findAll() {
        return this.pedidoService.findAll();
    }
    async findOne(id) {
        return this.pedidoService.findOne(id);
    }
    async create(productId, userId) {
        return this.pedidoService.create(productId, userId);
    }
    async update(id, status) {
        return this.pedidoService.update(id, status);
    }
    async delete(id) {
        return this.pedidoService.delete(id);
    }
};
exports.PedidoController = PedidoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos los pedidos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de pedidos exitosa', type: [pedido_entity_1.Pedido] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un pedido por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido encontrado', type: pedido_entity_1.Pedido }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo pedido' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pedido creado', type: pedido_entity_1.Pedido }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Producto o usuario no encontrado' }),
    (0, swagger_1.ApiBody)({ schema: { example: { productId: 1, userId: 1 } } }),
    __param(0, (0, common_1.Body)('productId')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza el estado de un pedido' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pedido actualizado', type: pedido_entity_1.Pedido }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido no encontrado' }),
    (0, swagger_1.ApiBody)({ schema: { example: { status: 'pagado' } } }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un pedido' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Pedido eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Pedido no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "delete", null);
exports.PedidoController = PedidoController = __decorate([
    (0, swagger_1.ApiTags)('pedidos'),
    (0, common_1.Controller)('pedidos'),
    __metadata("design:paramtypes", [pedido_service_1.PedidoService])
], PedidoController);
//# sourceMappingURL=pedido.controller.js.map