import { IsUUID, IsInt, Min, IsString } from 'class-validator';

export class AddToCartDto {
  @IsString()
  userId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
