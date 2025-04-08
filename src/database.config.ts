import { ConfigModule } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { User } from './user/user.entity';
import { Category } from './category/entities/category.entity';
import { Product } from './product/product.entity';
import { Order, OrderItem } from './order/order.entity';
import { Cart, CartItem } from './cart/cart.entity';
import { Review } from './Reviews/review.entity';
//import { Product } from './product/product.entity';

ConfigModule.forRoot();

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'Ilovewood1**',
  database: process.env.DB_NAME || 'loggon_db',
  synchronize: true,
  entities: [User, Category, Product, Order, OrderItem, CartItem, Cart, Review],
};
