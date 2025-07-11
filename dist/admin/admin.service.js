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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
let AdminService = class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    async findAll() {
        return this.adminRepository.find();
    }
    async findOne(id) {
        const admin = await this.adminRepository.findOne({ where: { id } });
        if (!admin) {
            throw new Error('Administrador no encontrado');
        }
        return admin;
    }
    async findByUsername(username) {
        const admin = await this.adminRepository.findOne({ where: { username } });
        if (!admin) {
            throw new Error('Administrador no encontrado');
        }
        return admin;
    }
    async create(createAdminDto) {
        const admin = this.adminRepository.create(createAdminDto);
        return this.adminRepository.save(admin);
    }
    async update(id, updateAdminDto) {
        await this.adminRepository.update(id, updateAdminDto);
        return this.findOne(id);
    }
    async delete(id) {
        await this.adminRepository.delete(id);
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.Admin)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map