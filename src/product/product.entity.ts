import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Review } from 'src/Reviews/review.entity';
// import { OrderItem } from '../order/order-item.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  category: Category;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image: string; // URL or path to the image

  @Column({ type: 'text', nullable: true })
  description: string;

  // @OneToMany(() => Review, (review) => review.product)
  // reviews: Review[];

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  // orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
