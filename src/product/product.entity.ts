import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column()
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
}
