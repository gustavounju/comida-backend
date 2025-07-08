"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const categoria_module_1 = require("./categoria/categoria.module");
const producto_module_1 = require("./producto/producto.module");
const usuario_module_1 = require("./usuario/usuario.module");
const admin_module_1 = require("./admin/admin.module");
const pedido_module_1 = require("./pedido/pedido.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.DB_HOST || 'localhost',
                port: parseInt(process.env.DB_PORT || '3306'),
                username: process.env.DB_USERNAME || 'root',
                password: process.env.DB_PASSWORD || 'tu_contraseña_aquí',
                database: process.env.DB_DATABASE || 'comida_db',
                entities: ['dist/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            categoria_module_1.CategoriaModule,
            producto_module_1.ProductoModule,
            usuario_module_1.UsuarioModule,
            admin_module_1.AdminModule,
            pedido_module_1.PedidoModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map