import { IsUUID, IsInt, Min } from 'class-validator';
import { User } from 'src/user/user.entity';

export class AddToCartDto {
  @IsUUID()
  userId: User;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
