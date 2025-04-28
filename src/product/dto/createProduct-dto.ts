import { IsString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { Express } from 'express';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  species: string;

  @IsOptional()
  @IsString()
  categoryId?: string; // ID from the Category table

  @IsInt()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  dimensions: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
