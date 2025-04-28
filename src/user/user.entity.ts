import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/order/order.entity';
import { Review } from 'src/Reviews/review.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
// import { Order } from '../order/order.entity';
// import { Review } from '../review/review.entity';

export const Roles = {
  Buyer: 'Buyer',
  Admin: 'Admin',
};

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName: string | null;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.Buyer })
  role: string; // Role can be Buyer or Admin

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]; // A user can have multiple orders

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]; // A user can leave multiple reviews

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart;

  @Column({ default: 0 })
  totalOrders: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
