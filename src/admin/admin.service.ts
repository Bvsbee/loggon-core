import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async getDashboardSummary(): Promise<any> {
    const totalProducts = this.productService.findAll();
    const totalUsers = this.userService.findAll();

    return { totalProducts, totalUsers };
  }
}
