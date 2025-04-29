import { Column, PrimaryColumn, Entity} from 'typeorm';

Entity()
export class ProductImage {
    @PrimaryColumn('primage')
    id: number

    @Column()
    name: string 

    @Column()
    url: string;

    @Column()
    uploadAt: Date;

    

}