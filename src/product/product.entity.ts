import { Column, Entity, PrimaryColumn, ManyToMany} from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Order } from 'src/order/order.entity';

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column("longtext")
  productDescription: string;

  @Column()
  productType: string;

  @Column()
  productDimensions: string;

  @Column()
  productCost: number;

  @Column()
  productQuantity: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;


  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
  }