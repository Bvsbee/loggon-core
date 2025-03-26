import { IsNotEmpty, IsNumber, IsUUID, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number;
}
