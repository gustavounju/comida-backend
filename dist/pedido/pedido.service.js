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
exports.PedidoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pedido_entity_1 = require("./pedido.entity");
const producto_service_1 = require("../producto/producto.service");
const usuario_service_1 = require("../usuario/usuario.service");
let PedidoService = class PedidoService {
    pedidoRepository;
    productoService;
    usuarioService;
    constructor(pedidoRepository, productoService, usuarioService) {
        this.pedidoRepository = pedidoRepository;
        this.productoService = productoService;
        this.usuarioService = usuarioService;
    }
    async findAll() {
        return this.pedidoRepository.find({ relations: ['productId', 'userId'] });
    }
    async findOne(id) {
        return this.pedidoRepository.findOneOrFail({ where: { id }, relations: ['productId', 'userId'] });
    }
    async create(productId, userId) {
        const producto = await this.productoService.findOne(productId);
        const usuario = await this.usuarioService.findOne(userId);
        const newPedido = this.pedidoRepository.create({
            productId: productId,
            userId: userId,
            totalAmount: producto.price,
            status: 'pendiente',
        });
        return this.pedidoRepository.save(newPedido);
    }
    async update(id, status) {
        const existingPedido = await this.findOne(id);
        existingPedido.status = status;
        return this.pedidoRepository.save(existingPedido);
    }
    async delete(id) {
        await this.pedidoRepository.delete(id);
    }
};
exports.PedidoService = PedidoService;
exports.PedidoService = PedidoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pedido_entity_1.Pedido)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        producto_service_1.ProductoService,
        usuario_service_1.UsuarioService])
], PedidoService);
//# sourceMappingURL=pedido.service.js.map