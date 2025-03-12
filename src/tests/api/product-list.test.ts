import { expect, test } from '@playwright/test';
import ProductListHelper from '../../api/product-list-helper';

test.describe('Product List API', { tag: '@api' }, () => {
  let productListHelper: ProductListHelper;

  test.beforeAll(async () => {
    productListHelper = await ProductListHelper.create();
  });

  test('should return all products with status 200', async () => {
    const response = await productListHelper.getAllProducts();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(200);
    expect(Array.isArray(responseBody.products)).toBeTruthy();
  });
});
