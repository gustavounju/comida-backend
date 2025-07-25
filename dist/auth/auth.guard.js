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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.get('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const canActivateResult = super.canActivate(context);
        if (typeof canActivateResult === 'boolean') {
            if (!canActivateResult) {
                throw new common_1.UnauthorizedException('Token inválido o no proporcionado');
            }
            return this.checkRoles(context);
        }
        return Promise.resolve(canActivateResult).then((result) => {
            if (!result) {
                throw new common_1.UnauthorizedException('Token inválido o no proporcionado');
            }
            return this.checkRoles(context);
        });
    }
    checkRoles(context) {
        const roles = this.reflector.get('roles', context.getHandler()) || [];
        if (roles.length === 0)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || !user.roles || !Array.isArray(user.roles)) {
            throw new common_1.UnauthorizedException('Usuario no tiene roles definidos o inválidos');
        }
        return roles.some((role) => user.roles.includes(role));
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=auth.guard.js.map