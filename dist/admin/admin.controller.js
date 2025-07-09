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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const admin_entity_1 = require("./admin.entity");
const create_admin_dto_1 = require("./dto/create-admin.dto");
const update_admin_dto_1 = require("./dto/update-admin.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async findAll() {
        return this.adminService.findAll();
    }
    async findOne(id) {
        return this.adminService.findOne(id);
    }
    async create(createAdminDto) {
        return this.adminService.create(createAdminDto);
    }
    async update(id, updateAdminDto) {
        return this.adminService.update(id, updateAdminDto);
    }
    async delete(id) {
        return this.adminService.delete(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos los administradores' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de administradores exitosa', type: [admin_entity_1.Admin] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene un administrador por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Administrador encontrado', type: admin_entity_1.Admin }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Administrador no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo administrador' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Administrador creado', type: admin_entity_1.Admin }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos inválidos' }),
    (0, swagger_1.ApiBody)({ schema: { example: { username: 'admin2', password: 'Admin456!' } } }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza un administrador' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Administrador actualizado', type: admin_entity_1.Admin }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Administrador no encontrado' }),
    (0, swagger_1.ApiBody)({ schema: { example: { username: 'admin2_updated', password: 'NewAdmin456!' } } }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_admin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un administrador' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Administrador eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Administrador no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "delete", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admins'),
    (0, common_1.Controller)('admins'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map