import { productList } from '../mock/productList';

export function getProductsById(id: string): object {
  return productList.find((value) => value.id === id);
}