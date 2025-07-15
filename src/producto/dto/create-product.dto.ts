import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  productName: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @IsOptional() // Hace description opcional, puedes omitirlo si no lo necesitas
  description?: string; // Añadido como opcional
}