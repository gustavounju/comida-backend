import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { ProductoModule } from '../producto/producto.module';
import { UsuarioModule } from '../usuario/usuario.module';



@Module({
  imports: [TypeOrmModule.forFeature([Pedido]), ProductoModule, UsuarioModule,],
  providers: [PedidoService],
  controllers: [PedidoController],
  exports: [PedidoService],
})
export class PedidoModule {}