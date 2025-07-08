import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Producto } from '../producto/producto.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Producto, (producto) => producto.id)
  productId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.id)
  userId: number;

  @Column({ type: 'float', nullable: false })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'pagado', 'entregado'],
    default: 'pendiente',
  })
  status: string;

  @Column({ length: 255, nullable: true })
  paymentId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
