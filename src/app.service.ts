import { Injectable } from '@nestjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';
@Injectable()
@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  isAdmin: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

export class Product {
  @PrimaryColumn('prid')
  id: string;

  @Column() 
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productType: string

  @Column()
  productDimensions: string 

  @Column()
  productCost: number; 

  @Column()
  productQuantity: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  }
  
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }


 
}

 



}
