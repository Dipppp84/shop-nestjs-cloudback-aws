import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { productList } from '../src/product/mock/productList';

const host = 'http://localhost:3000/dev';

describe('Base testing products', () => {
  const req = supertest(host);
  const commonHeaders = { Accept: 'application/json' };

  describe('getProducts', () => {
    it('should return an array of Products', async () => {
      const response = await req.get('/products').set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(productList);
    });

    it('should get Products by id', async () => {
      const id = 'b9dd6b5e-2505-4858-a9f5-449409bf1fcb'; //productList[1]
      const response = await req.get(`/products/${id}`).set(commonHeaders);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(productList[1]);
    });

    it('should respond with NOT_FOUND status', async () => {
      const randomId = '0a35dd62-e09f-444b-a628-f4e7c6954f57';
      const response = await req.get(`/products/${randomId}`).set(commonHeaders);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
