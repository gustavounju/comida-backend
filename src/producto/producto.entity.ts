import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoryId!: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria!: Categoria;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({ nullable: true })
  imageFilename!: string;

  @Column({ nullable: true })
  imageUrl!: string;

  @Column({ default: true })
  isAvailable!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}