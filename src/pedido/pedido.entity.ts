import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  productId!: number;

  @Column()
  userId!: number;

  @Column()
  totalAmount!: number;

  @Column()
  status!: string;

  @Column()
  paymentId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}