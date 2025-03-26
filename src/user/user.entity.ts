import { Column, Entity, PrimaryColumn ,OneToMany} from 'typeorm';
import { Order } from 'src/order/order.entity';

export const Roles = { 
  Buyer: 'Buyer',
  Admin: 'Admin'
}

@Entity()
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({type: 'varchar', nullable: true})
  firstName: string | null;

  @Column({type: 'varchar', nullable: true})
  lastName: string | null; 

  @Column({type: 'varchar', nullable: true})
  email: string | null;

  @Column({type: 'varchar', nullable: true})
  passwordHash: string | null; 

  @Column()
  isAdmin: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

}
