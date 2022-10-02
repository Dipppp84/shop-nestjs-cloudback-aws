import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { configAsync } from "./config.orm";

@Module({
  imports: [ProductModule, TypeOrmModule.forRootAsync(configAsync)],
  controllers: [],
  providers: [],
})
export class AppModule {}
