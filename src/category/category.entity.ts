//Will contain category entity details @ManytoMany
//Many categories can be applied to multiple products and vice versa 
//Many products may be applicable to one user

import { Entity, Column, PrimaryColumn,  ManyToMany, JoinTable } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Category {
  @PrimaryColumn({ generated: "uuid" })
  category_id: number;

  @Column()
  type: string;

  @Column()
  dimensions: number;

  @Column()
  finish: string;

  

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable({ name: "order_products" })
  products: Product[];
}