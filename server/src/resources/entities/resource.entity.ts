import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryType } from '../enums/category-type.enum';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: CategoryType })
  category: CategoryType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ type: 'date', nullable: true })
  fromdate: Date;

  @Column({ type: 'date', nullable: true })
  todate: Date;
}