import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';

@Entity('producto')
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.id)
  categoryId: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ length: 255, nullable: true })
  imageFilename: string;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isAvailable: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
