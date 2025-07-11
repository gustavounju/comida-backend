"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Comida Backend API')
        .setDescription('API para la gestión de una tienda de comidas online')
        .setVersion('1.0')
        .addTag('categorias')
        .addTag('productos')
        .addTag('usuarios')
        .addTag('admins')
        .addTag('pedidos')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map