import { Product } from 'src/product/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
Product;

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToOne(() => Category, (category) => category.children, { nullable: true })
  @JoinColumn()
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
