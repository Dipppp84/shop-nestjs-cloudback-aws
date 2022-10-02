import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stock } from './stocks.entity';

@Entity()
export class Product {
  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  title: string;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  description: string;
  @ApiProperty()
  @Column({ type: 'float4', nullable: false })
  price: number;
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  image: string;

  @OneToOne(() => Stock, (stock) => stock.product_id, { eager: true })
  stock: Stock;
}
