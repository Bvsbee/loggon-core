import { Column, PrimaryColumn, Entity} from 'typeorm';

Entity()
export class productImage {
    @PrimaryColumn('primage')
    id: number

    @Column()
    name: string 

    @Column()
    datacreated: Date;

    @Column()
    dateUpdated: Date;

}