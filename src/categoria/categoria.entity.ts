import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Producto } from '../producto/producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos!: Producto[];
}