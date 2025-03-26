import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Product)
  product: Product;
  
  @Column({type: 'varchar'})
  productId: string;

  @ManyToOne(() => User)
  user: User; 

  @Column({type: 'int'})
  rating: number; 

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;


}