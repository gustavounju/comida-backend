import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './pedido.entity';
import { PedidoService } from './pedido.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido])],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}
