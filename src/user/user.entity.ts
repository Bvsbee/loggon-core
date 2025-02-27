import { Column, Entity, PrimaryColumn } from 'typeorm';

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


}
