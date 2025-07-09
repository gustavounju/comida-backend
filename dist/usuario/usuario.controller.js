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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuario_service_1 = require("./usuario.service");
const usuario_entity_1 = require("./usuario.entity");
let UsuarioController = class UsuarioController {
    usuarioService;
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    async findAll() {
        return this.usuarioService.findAll();
    }
    async findOne(id) {
        return this.usuarioService.findOne(id);
    }
    async findByEmail(email) {
        return this.usuarioService.findByEmail(email);
    }
    async create(usuario) {
        return this.usuarioService.create(usuario);
    }
    async update(id, usuario) {
        return this.usuarioService.update(id, usuario);
    }
    async delete(id) {
        return this.usuarioService.delete(id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos los usuarios' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuarios exitosa', type: [usuario_entity_1.Usuario] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un usuario por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario encontrado', type: usuario_entity_1.Usuario }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un usuario por email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario encontrado', type: usuario_entity_1.Usuario }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo usuario' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuario creado', type: usuario_entity_1.Usuario }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email inválido o duplicado' }),
    (0, swagger_1.ApiBody)({ schema: { example: { email: 'nuevo@ejemplo.com' } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un usuario' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario actualizado', type: usuario_entity_1.Usuario }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email duplicado' }),
    (0, swagger_1.ApiBody)({ schema: { example: { email: 'nuevo.cambio@ejemplo.com' } } }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un usuario' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Usuario eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "delete", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, swagger_1.ApiTags)('usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map