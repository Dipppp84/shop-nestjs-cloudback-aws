import { ApiProperty } from "@nestjs/swagger";

export class Product {
  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  image: string;
}
