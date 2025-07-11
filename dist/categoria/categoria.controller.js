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
exports.CategoriaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categoria_service_1 = require("./categoria.service");
const categoria_entity_1 = require("./categoria.entity");
let CategoriaController = class CategoriaController {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
    }
    async findAll() {
        return this.categoriaService.findAll();
    }
    async findOne(id) {
        return this.categoriaService.findOne(id);
    }
    async create(categoria) {
        return this.categoriaService.create(categoria);
    }
    async update(id, categoria) {
        return this.categoriaService.update(id, categoria);
    }
    async delete(id) {
        return this.categoriaService.delete(id);
    }
};
exports.CategoriaController = CategoriaController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas las categorías' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de categorías exitosa', type: [categoria_entity_1.Categoria] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene una categoría por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoría encontrada', type: categoria_entity_1.Categoria }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea una nueva categoría' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Categoría creada', type: categoria_entity_1.Categoria }),
    (0, swagger_1.ApiBody)({ schema: { example: { name: 'postres' } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza una categoría' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Categoría actualizada', type: categoria_entity_1.Categoria }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    (0, swagger_1.ApiBody)({ schema: { example: { name: 'postres y bebidas' } } }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina una categoría' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Categoría eliminada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Categoría no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "delete", null);
exports.CategoriaController = CategoriaController = __decorate([
    (0, swagger_1.ApiTags)('categorias'),
    (0, common_1.Controller)('categorias'),
    __metadata("design:paramtypes", [categoria_service_1.CategoriaService])
], CategoriaController);
//# sourceMappingURL=categoria.controller.js.map