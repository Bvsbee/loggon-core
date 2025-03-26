//Will containg order entity details 
//OnetoMany One or may have several products
//Bidirectional relationship with product entity

import { Entity, Column, PrimaryColumn, ManyToMany, ManyToOne,JoinTable } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class Order {
  @PrimaryColumn({ generated: "uuid" })
  order_id: string;

  @Column()
  total: number;

  @Column()
  ordered_on: Date

  @Column()
  created_on: Date

  @Column()
  updated_on: Date

  @Column({ nullable: true })
  deleted_on: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @ManyToOne(() => User)
  //@JoinColumn({ name: 'id' })
  user: User;
}