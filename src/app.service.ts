import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

export class productImage {
    @PrimaryColumn('primage')
    id: number;

    @Column()
    name: string;

    @Column()
    datacreated: Date;

    @Column()
    dateUpdated: Date;

}

export class AppService {

  constructor(
  @InjectRepository(productImage)
  private readonly imageRepository: Repository<productImage>,
  ){}

  async getImages(): Promise<productImage[]>{
    return this.imageRepository.find();
  }

  async createImages(image: productImage): Promise<productImage>{
    return this.imageRepository.save(image);
  }

  async getImage(id: number): Promise<productImage>{
    return this.imageRepository.findOneBy({id});
  }

  async deleteImage(id: number): Promise<void>{
    await this.imageRepository.delete(id);
  }


 

}

 




